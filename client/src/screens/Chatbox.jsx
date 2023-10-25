const TalkjsRn = require("@talkjs/expo");
import { useFocusEffect } from "@react-navigation/core";
import { useCallback } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/actions";
import CustomHeader from "../components/CustomHeader";

export const Chatbox = (props) => {
  const { profile } = useSelector((state) => state.userReducer);
  const { fullName, id, profilePicture, email } = props.route.params;
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      dispatch(getUser());
    }, [])
  );
  const conversation = props.conversationBuilder;
  const other = {
    id: id,
    name: fullName,
    email: email,
    photoUrl: profilePicture,
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const me = {
    id: profile.id,
    name: profile.fullName,
    email: profile.email,
    photoUrl: profile.UserProfile.profilePicture,
    role: "default",
  };
  const conversationId = TalkjsRn.oneOnOneId(me.id, other.id);
  const conversationBuilder = TalkjsRn.getConversationBuilder(conversationId);
  conversationBuilder.setAttributes({ subject: other.name });

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);
  return (
    <View style={{ flex: 1 }}>
      {/* <CustomHeader title="Chat" /> */}
      <TalkjsRn.Session appId="tIFEBGyD" me={me}>
        <TalkjsRn.Chatbox
          conversationBuilder={conversation || conversationBuilder}
        />
      </TalkjsRn.Session>
    </View>
  );
};
