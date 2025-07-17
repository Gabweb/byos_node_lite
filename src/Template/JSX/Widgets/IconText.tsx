

export default function IconText({ icon, text }: { icon: string, text: string }) {
    return (
        <div className="flex">
            <i style={{ fontSize: '17px' }} className={icon + " wi-fw wi"}></i >
            <span style={{ fontSize: '17px' }} className="label label--small" data-pixel-perfect="true">
                {text}
            </span>
        </div>

    )
}