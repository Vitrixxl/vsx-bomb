"use client"

import { useEffect, useState, useRef } from 'react';
import { getSocket } from '@/socket';
import { useParams } from 'next/navigation';
import Player from '@/components/player';
import { styleText } from 'util';

export default function Game() {
    const socket = getSocket();
    const { id } = useParams();
    const [grid, setGrid] = useState<any[]>([[]])
    const [users, setUsers] = useState<User[]>([])
    const [gridLength, setGridLength] = useState(0)
    const [moving, setMoving] = useState(false);
    const movingRef = useRef(moving);

    const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500"]

    useEffect(() => {
        if (socket) {
            socket.emit("globalInfo", id)
            socket.on("globalInfo", (globalInfo: any) => {
                console.log(globalInfo)
                setGrid(globalInfo.grid)
                setUsers(globalInfo.members)
            })
            socket.on("newPosition", (newPosition: any) => {
                setGrid(newPosition.grid)
                setUsers(newPosition.members)
                setGridLength(newPosition.grid.length)
            })
            socket.on("newBomb", (grid: Array<any>) => {
                console.log(grid)
                setGrid(grid)
            })
            socket.on("explode", (grid: Array<any>) => {
                setGrid(grid)
            })
            socket.on("gameOver", (deathMessage: string) => {
                alert(deathMessage)
            })
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (movingRef.current) return;
            console.log(e.key)
            movingRef.current = true;
            setMoving(true);

            if (e.key === "ArrowUp") {
                socket.emit("move", "up", id)
            }
            if (e.key === "ArrowDown") {
                socket.emit("move", "down", id)
            }
            if (e.key === "ArrowLeft") {
                socket.emit("move", "left", id)
            }
            if (e.key === "ArrowRight") {
                socket.emit("move", "right", id)
            }
            if (e.key === " ") {
                socket.emit("bomb", id)
            }
            setTimeout(() => {
                movingRef.current = false;
                setMoving(false);
            }, 100);
        }

        document.addEventListener("keydown", handleKeyDown);


        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        }

    }, [])
    useEffect(() => {
        console.log(users)
    }, [users])
    type Bloc = {
        block: number,
        user: string,
        bomb: boolean
    }
    type User = {
        username: string,
        position: {
            x: number,
            y: number
        }
    }

    return (
        <div className="w-full h-screen py-8  px-10">

            <div className="fixed top-4 left-4 w-72 px-4  py-2 border border-white flex flex-col gap-2 ">
                <h1>Players : </h1>
                <div className="flex flex-col gap-2 w-full">
                    {users && users.map((user: User) => (
                        <div className="w-full flex items-center justify-between">
                            <p>{user.username}</p>
                            <p>0</p>
                        </div>

                    ))}
                </div>
            </div>
            {grid && grid.length > 1 && (

                <div className={`max-h-full grid  max-w-6xl mx-auto aspect-square relative grid-rows-11 grid-cols-11`} >
                    {grid.map((row: Array<Bloc>) => (
                        row.map((bloc: Bloc) => {
                            let block
                            switch (bloc.block) {
                                case 0:
                                    block = "dirt"
                                    break;
                                case 1:
                                    block = "wood"
                                    break;
                                case 2:
                                    block = "bedrock"
                                    break;

                            }
                            return (

                                <div className={"row-span-1 col-span-1  p-2 " + (block)} >{bloc.bomb && <div className='size-full bomb'> </div>}   </div>
                            )
                        }
                        )
                    ))}
                    <div className={`w-full h-full absolute top-0 left-0`}>
                        <div className='relative'>

                            {users.map((user: User, index: number) => (
                                <div
                                    key={index}
                                    className={` aspect-square absolute transition-transform p-4 duration-200 linear } `}
                                    style={{ transform: `translate(${user.position.y * 100}%, ${user.position.x * 100}%)`, width: `${100 / grid.length}%` }}
                                >
                                    <div className={`${colors[index]} rounded-full w-full h-full`} />


                                    <div className="absolute bottom-16">
                                        <p className="text-center text-foreground">{user.username}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            )
            }

        </div >
    );
}