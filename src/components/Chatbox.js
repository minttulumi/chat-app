import React from "react";
import firebase from '../firebase';


class Chatbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: [],
        };
    }


componentDidMount(){
    const chatRef = firebase.database().ref('general');
    chatRef.on('value', snapshot => {
        const getChats = snapshot.val();
        let assChats = [];
        for(let chat in getChats){
            if(getChats[chat].message !== ''){
                assChats.push({
                    id: chat,
                    message: getChats[chat].message,
                    user: getChats[chat].user,
                    date: getChats[chat].timestamp
                });
            }
        }
        const chats = assChats.reverse();
        this.setState({chats});
    });
}

render() {
        return(
            <div className="chatbox">
                <ul className="chat-list">
                    {this.state.chats.map(chat => {
                        const postDate = new Date(chat.date);
                        return(
                            <li key={chat.id}>
                                <strong class="user">{chat.user} ♥</strong> <em class="time">{postDate.getDate() + '/' + (postDate.getMonth()+1)}</em>
                                <br></br>
                                {chat.message}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}

export default Chatbox;