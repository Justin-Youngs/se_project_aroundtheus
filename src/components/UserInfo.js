export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector, avatarSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._about = document.querySelector(profileDescriptionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._about.textContent = data.about;
    if (data.avatar) {
      this._avatar.src = data.avatar;
    }
  }
}
