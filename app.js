import Box2DFactory from './dist/Box2D';
import { makeDebugDraw } from './draw';
Box2DFactory().then(box2D => {
    setInterval(main, 3000)
    function main() {
        console.log(box2D);
        const { b2BodyDef, b2_dynamicBody, b2PolygonShape, b2Vec2, b2World, b2EdgeShape } = box2D;
        
        const canvas = document.getElementById("sim");
        canvas.style = "position:absolute; left: 25%;"
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
        const zero = new b2Vec2(5, -1);
        const bd = new b2BodyDef();
        bd.set_type(b2_dynamicBody);
        bd.set_position(zero);
        const body = world.CreateBody(bd);
        const obstacle = new b2EdgeShape();
        const obstacle1 = new b2EdgeShape();
        const obstacle2 = new b2EdgeShape();
        const obstacle3 = new b2EdgeShape();
        const obstacle4 = new b2EdgeShape();
        const obstacle5 = new b2EdgeShape();
        const obstacle6 = new b2EdgeShape();
        const obstacle7 = new b2EdgeShape();
        //Ranges: X Axis 0-20 Y Axis 0-20
        obstacle.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle1.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(20) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle2.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle3.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(15) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle4.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle5.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(10) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle6.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0))))
        obstacle7.SetTwoSided(new b2Vec2(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0))), new b2Vec2(Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0)), Math.floor(Math.random() * (Math.floor(5) - Math.ceil(0) + 1) + Math.ceil(0))))
        const bd_ground = new b2BodyDef();
        const ground = world.CreateBody(bd_ground);
        ground.CreateFixture(obstacle, 0);
        ground.CreateFixture(obstacle1, 0);
        ground.CreateFixture(obstacle2, 0);
        ground.CreateFixture(obstacle3, 0);
        ground.CreateFixture(obstacle4, 0);
        ground.CreateFixture(obstacle5, 0);
        ground.CreateFixture(obstacle6, 0);
        ground.CreateFixture(obstacle7, 0);
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