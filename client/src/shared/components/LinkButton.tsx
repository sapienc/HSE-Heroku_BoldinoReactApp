import { withRouter, RouteComponentProps } from 'react-router'

interface Props extends RouteComponentProps {
    history: RouteComponentProps["history"],
    location: RouteComponentProps["location"],
    match: RouteComponentProps["match"],
    staticContext: RouteComponentProps["staticContext"],
    to: string,
    onClick?: (e: React.SyntheticEvent) => {},
    style?: React.CSSProperties | undefined,
    className?: string,
    title?: string,
    rest?: []
};

const LinkButton = (props: Props) => {
    const {
        history,
        location,
        match,
        staticContext,
        to,
        onClick,
        style,
        className,
        title,
        ...rest
    } = props;

    return (
        <button
            style={style}
            className={className}
            title={title}
            {...rest}
            onClick={(event) => {
                onClick && onClick(event)
                history.push(to)
            }}
        />
    )
}

export default withRouter(LinkButton);