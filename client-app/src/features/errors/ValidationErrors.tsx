import {Message} from "semantic-ui-react";

interface Props {
    errors: string[];
}
export default function ValidationErrors({errors}: Props) {
    return(
        <Message error>
            {errors.length > 0 &&
                <Message.List>
                    {errors.map((e: string, i) => (
                        <Message.Item key={i}>{e}</Message.Item>
                    ))}
                </Message.List>
            }
        </Message>  
    );
}