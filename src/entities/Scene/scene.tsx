import React, {Suspense} from 'react';
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Model from "@/entities/Scene/model/model";

const Scene = () => {
    return (
        <Canvas>
            <directionalLight color={'#16a34a'} intensity={10} />
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
};

export default Scene;