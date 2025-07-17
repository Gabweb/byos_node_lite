

export default function IconText({ icon, text }: { icon: string, text: string }) {
    return (
        <span className="label label--small">
            <i className={icon + " wi-fw wi mr--1"}></i>
            {text}
        </span>
    )
}