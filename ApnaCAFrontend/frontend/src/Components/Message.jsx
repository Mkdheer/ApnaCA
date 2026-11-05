import '../Css/Message.css';

function Message(props){
    const{message} = props;
    console.log("My Message", message);
    if(!message) return null;
    return (
        <div className="toast-container">
            <article className="message is-success">
                <div className="message-header">
                    <p>✓ Success!</p>
                </div>

                <div className="message-body">
                    <strong>{message}</strong>
                </div>
            </article>
        </div>
    );
}

export default Message;