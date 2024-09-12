import React, {useEffect, useRef} from 'react';
import {useGLTF} from "@react-three/drei";
import {Group} from "three";
import {useFrame, useLoader, useThree} from "@react-three/fiber";
import {useRouter} from "next/navigation";

useGLTF.preload('/case1.glb')


const Model = () => {
    const group = useRef<Group>(null)
    const { pointer, camera,gl  } = useThree();
    const router = useRouter()

    const handleMouseMove = (event: MouseEvent) => {
        pointer.x = (event.clientX / window.innerWidth / 2) * 2 - 1;
        pointer.y = -(event.clientY / window.innerHeight / 2) * 2 + 1;
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [handleMouseMove]);

    useFrame(() => {
        if (group.current) {
            group.current.rotation.y = pointer.x * 0.15;
            group.current.rotation.x = -pointer.y * 0.15;
        }
    });
    const handlePointerOver = () => {
        gl.domElement.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        gl.domElement.style.cursor = 'auto';
    };
    const {nodes, materials, animations, scene} = useGLTF('/case1.glb')
    return (
        <group onClick={() => router.push('/vacancies')}
               onPointerOver={handlePointerOver}
               onPointerOut={handlePointerOut}
               ref={group}>
            <primitive rotation={[0.6, 4.7, 0.5]} position={[0,-1.5,0.5]} object={scene} />
        </group>
    );
};

export default Model;