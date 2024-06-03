

type Position = {
    x: number,
    y: number

}
export default function Player({ username, color, position }: { username: string, color: string, position: Position }) {
    console.log(position.x.toString())
    return (
        <div className={`transiton-all duration-200 size-8 rounded-full ${color} relative col-start-${position.y.toString()} `} style={{ gridColumnStart: position.y + 1, gridRowStart: position.x + 1 }}>
            <div className="absolute bottom-16">
                <p className="text-center text-foreground">{username}</p>

            </div>

        </div>
    );
}