import React, { useEffect, useRef } from "react";
import { getUser } from "../../store/actions/userAction";
const TalkjsRn = require("@talkjs/expo");

export default function TalkJs() {
  const chatboxRef = useRef(null);
  const { profile } = useSelector((state) => state.userReducer);
  useEffect(() => {
    // Stop listening to the focus event.
    // A handler for this event has been set in Chatbox below.
    chatboxRef.current.off("focus");
    dispatch(getUser());
  }, []);

  const user = {
    id: profile.id,
    name: profile.fullName,
    email: profile.email,
    photoUrl: profile.UserProfile.profilePicture,
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: "123456789",
    name: "Sebastian",
    email: "Sebastian@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, how can I help? https://google.com",
    role: "default",
  };

  const conversationId = TalkjsRn.oneOnOneId(user.id, other.id);
  const conversationBuilder = TalkjsRn.getConversationBuilder(conversationId);

  conversationBuilder.setParticipant(user);
  conversationBuilder.setParticipant(other, { notify: false });

  conversationBuilder.setAttributes({ subject: "Random conversation" });

  return (
    <TalkjsRn.Session appId="tIFEBGyD" me={user} enablePushNotifications={true}>
      <TalkjsRn.Chatbox
        ref={chatboxRef}
        conversationBuilder={conversationBuilder}
        messageField={{
          enterSendsMessage: false,
          placeholder: "Type a message",
        }}
        highlightedWords={["me", "you"]}
        onBlur={(event) => console.log("onBlur: ", event)}
        onFocus={(event) => console.log("onFocus: ", event)}
        onSendMessage={(event) => console.log("onSendMessage: ", event)}
      />
    </TalkjsRn.Session>
  );
}
