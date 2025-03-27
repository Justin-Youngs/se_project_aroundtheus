class UserInfo {
  constructor(profileName, jobElement) {
    this._profileName = profileName;
    this._jobElement = jobElement;
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
