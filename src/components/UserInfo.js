export default class UserInfo {
  constructor(profileNameSelector, profileDescriptionSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._jobElement = document.querySelector(profileDescriptionSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._jobElement.textContent = data.job;
  }
}
