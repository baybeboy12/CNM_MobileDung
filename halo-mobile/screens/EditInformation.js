import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { Avatar } from "@rneui/themed";
import Icon from "react-native-vector-icons/AntDesign";
import { useSelector, useDispatch } from "react-redux";
import userApi from "../api/userApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import extendFunctions from "../constants/extendFunctions";
import { updateUser } from "../redux/userSlice";

const EditInformation = ({ navigation }) => {
  const user = useSelector((state) => state.userLogin.user);
  const dispatch = useDispatch();
  const [selectedGender, setSelectedGender] = useState(user.sex);
  const [editingName, setEditingName] = useState(false);
  const [editingBirthday, setEditingBirthday] = useState(false);
  const [name, setName] = useState(user.name);
  const [birthday, setBirthday] = useState(user.dateOfBirth);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangeBirthday = (text) => {
    setBirthday(text);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender(gender);
  };

  const handleEditName = () => {
    setEditingName(true);
  };

  const handleEditBirthday = () => {
    setEditingBirthday(true);
  };

  const handleSaveName = () => {
    setEditingName(false);
  };

  const handleSaveBirthday = () => {
    setEditingBirthday(false);
  };

  const handlerUpdate = async () => {
    const newData = {
      _id: user._id,
      name: name,
      sex: selectedGender,
      dateOfBirth: birthday,
    };
    const req = await userApi.updateUser(newData);
    dispatch(updateUser(req.DT));
    // await AsyncStorage.setItem("login", JSON.stringify(req.DT));
    Alert.alert("Cập nhật thành công!");
  };

  const handleEditAvatar = () => {
    // Xử lý sự kiện khi người dùng muốn chỉnh sửa avatar
    // Ví dụ: mở thư viện ảnh để chọn avatar mới
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Icon name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleEditAvatar}>
              <Avatar
                size={100}
                rounded
                title={extendFunctions.getAvatarName(user.name)}
                containerStyle={{ backgroundColor: user.avatar.color }}
              />
              <Icon name="edit" size={20} style={styles.editAvatarIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.inputContainer}>
              {editingName ? (
                <>
                  <TextInput
                    value={name}
                    onChange={handleChangeName}
                    style={styles.input}
                  />
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={handleSaveName}
                  >
                    <Icon name="check" size={20} color="#007bff" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text>{name}</Text>
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={handleEditName}
                  >
                    <Icon name="edit" size={20} color="#007bff" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.inputContainer}>
              {editingBirthday ? (
                <>
                  <TextInput
                    value={birthday}
                    onChangeText={handleChangeBirthday}
                    style={styles.input}
                  />

                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={handleSaveBirthday}
                  >
                    <Icon name="check" size={20} color="#007bff" />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text>{birthday}</Text>
                  <TouchableOpacity
                    style={styles.editIcon}
                    onPress={handleEditBirthday}
                  >
                    <Icon name="edit" size={20} color="#007bff" />
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Nam" && styles.selectedGender,
                ]}
                onPress={() => handleSelectGender("Nam")}
              >
                {selectedGender === "Nam" && (
                  <Icon name="check" size={20} color="white" />
                )}
                <Text
                  style={[
                    styles.genderText,
                    selectedGender === "Nam" && styles.selectedGenderText,
                  ]}
                >
                  Nam
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.genderOption,
                  selectedGender === "Nữ" && styles.selectedGender,
                ]}
                onPress={() => handleSelectGender("Nữ")}
              >
                {selectedGender === "Nữ" && (
                  <Icon name="check" size={20} color="white" />
                )}
                <Text
                  style={[
                    styles.genderText,
                    selectedGender === "Nữ" && styles.selectedGenderText,
                  ]}
                >
                  Nữ
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={handlerUpdate}>
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center",
              marginLeft: 5,
              fontWeight: 600,
              color: "white",
            }}
          >
            Lưu
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  backButton: {
    paddingHorizontal: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    justifyContent: "space-between", // Để căn chỉnh nút "LƯU" xuống dưới
  },
  infoContainer: {
    flexDirection: "row", // Sửa thành flexDirection: 'row'
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: "gray",
    borderRadius: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  editIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#3498db",
    width: "80%",
    height: 35,
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 12,
    justifyContent: "center",
    marginBottom: "95%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  genderContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    padding: 5,
    borderRadius: 15,
    // borderWidth: 1,
    // borderColor: "#ccc",
  },
  selectedGender: {
    backgroundColor: "#3498db",
    borderColor: "#3498db",
  },
  genderText: {
    fontWeight: 500,
    marginLeft: 5,
  },
  selectedGenderText: {
    color: "white",
  },
  editAvatarIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#dadada",
    color: "#007bff",
  },
});

export default EditInformation;
