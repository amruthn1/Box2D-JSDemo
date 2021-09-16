import Box2DFactory from './dist/Box2D';
import { makeDebugDraw } from './draw';
Box2DFactory().then(box2D => {
    setInterval(main, 3000)
    function main() {
        console.log(box2D);
        const { b2BodyDef, b2_dynamicBody, b2PolygonShape, b2Vec2, b2World, b2EdgeShape } = box2D;
        
        const canvas = document.getElementById("sim");
        const ctx = canvas.getContext('2d');
        const gravity = new b2Vec2(0, 10);
        const pixelsPerMeter = 32;
        const cameraOffsetMetres = {
            x: 2,//Math.floor(Math.random() * (10 - 1 + 1) + 1)
            y: 2//Math.floor(Math.random() * (10 - 1 + 1) + 1)
        };
        const debugDraw = makeDebugDraw(ctx, pixelsPerMeter, box2D);
        const world = new b2World(gravity);
        world.SetDebugDraw(debugDraw);
        const sideLengthMetres = 1;
        const square = new b2PolygonShape();
        square.SetAsBox(sideLengthMetres / 2, sideLengthMetres / 2);
        const zero = new b2Vec2(1, -2);
        const bd = new b2BodyDef();
        bd.set_type(b2_dynamicBody);
        bd.set_position(zero);
        const body = world.CreateBody(bd);
        const obstacle = new b2EdgeShape();
        const obstacle1 = new b2EdgeShape();
        obstacle1.SetTwoSided(new b2Vec2(10, 10), new b2Vec2())
        obstacle.SetTwoSided(new b2Vec2(10, 14), new b2Vec2(15, 2))
        const bd_ground = new b2BodyDef();
        const ground = world.CreateBody(bd_ground);
        ground.CreateFixture(obstacle, 0);
        ground.CreateFixture(obstacle1, 0);
        body.CreateFixture(square, 1);
        body.SetTransform(zero, 0);
        body.SetLinearVelocity(zero);
        body.SetAwake(true);
        body.SetEnabled(true);
        const maxTimeStepMs = 1 / 60 * 1000;
        const velocityIterations = 1;
        const positionIterations = 1;
        const step = (deltaMs) => {
            const clampedDeltaMs = Math.min(deltaMs, maxTimeStepMs);
            world.Step(clampedDeltaMs / 1000, velocityIterations, positionIterations);
        };
        const drawCanvas = () => {
            ctx.fillStyle = 'rgb(0,0,0)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.save();
            ctx.scale(pixelsPerMeter, pixelsPerMeter);
            const { x, y } = cameraOffsetMetres;
            ctx.translate(x, y);
            ctx.lineWidth /= pixelsPerMeter;

            ctx.fillStyle = 'rgb(255,255,0)';
            world.DebugDraw();

            ctx.restore();
        };
        let handle;
        (function loop(prevMs) {
            const nowMs = window.performance.now();
            handle = requestAnimationFrame(loop.bind(null, nowMs));
            const deltaMs = nowMs - prevMs;
            step(deltaMs);
            drawCanvas();
        }(window.performance.now()));
    }
});