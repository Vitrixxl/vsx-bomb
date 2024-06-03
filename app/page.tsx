"use client";
import { Input, Button } from "@nextui-org/react";
import { getSocket } from "@/socket";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function LauchPage() {
    const router = useRouter();
    const socket = getSocket();
    const [username, setUsername] = useState("");
    const [link, setLink] = useState("");


    const createGame = async (event: any) => {

        event.preventDefault();

        if (socket) {
            socket.emit("create", username)
            socket.on("redirect", (url: string) => {

                router.push(url)
            })
        }

    }
    const joinGame = async (event: any) => {

        event.preventDefault();

        if (socket) {
            socket.emit("join", link, username)
            socket.on("redirect", (url: string) => {

                router.push(url)
            })

        }
    }
    const [join, setJoin] = useState(false);




    return (
        <>
            {!join ? (
                <div className="h-full w-full flex items-center justify-center flex-col">
                    <div className="w-fit ">
                        <h1 className="text-2xl text-foreground ">Ready to bomb your friends ?</h1>
                        <form onSubmit={createGame} className=" flex flex-col gap-2 items-end w-full" >
                            <Input type="text" size="sm" label={"Username"} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                            <Button size="sm" color="primary" type="submit">Start</Button>
                        </form>
                        <Button size="sm" color="secondary" type="submit" onClick={() => setJoin(!join)}>Join a game</Button>
                    </div>
                </div>
            ) : (<> <div className="h-full w-full flex items-center justify-center flex-col">
                <div className="w-fit ">
                    <h1 className="text-2xl text-foreground ">Ready to bomb your friends ?</h1>
                    <form onSubmit={joinGame}>
                        <Input type="text" size="sm" label={"Username"} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />
                        <Input type="text" size="sm" label={"Username"} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setLink(e.target.value)} />
                        <Button size="sm" color="primary" type="submit">Join</Button>

                    </form>

                </div>
            </div></>
            )}
        </>)
}