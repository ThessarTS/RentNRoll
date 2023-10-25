import { View, Button } from "react-native";

const TalkjsRn = require("@talkjs/expo");

export default function ConversationList(props) {
  const { fullName, id, email, profilePicture } = props.route.params;
  const me = {
    id: id,
    name: fullName,
    email: email,
    photoUrl: profilePicture,
    role: "default",
  };
  const onSelectConversation = (event) => {
    props.navigation.navigate("Chatbox", {
      fullName: event.others[0].name,
      profilePicture: event.others[0].photoUrl,
      id: event.others[0].id,
      email: event.others[0].email,
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <TalkjsRn.Session appId="tIFEBGyD" me={me}>
        <TalkjsRn.ConversationList
          onSelectConversation={onSelectConversation}
        />
      </TalkjsRn.Session>
    </View>
  );
}
