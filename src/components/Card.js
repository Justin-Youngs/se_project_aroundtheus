class Card {
  constructor(data, cardSelector, openPreview, api, handleDeleteClick, userId) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._ownerId = data.owner;
    this._userId = userId;
    this._openPreview = openPreview;
    this._cardSelector = cardSelector;
    this._api = api;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeIcon());

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this._id, this._element);
      });

    this._imageElement.addEventListener("click", () => {
      this._openPreview({ name: this._name, link: this._link });
    });
  }

  _handleLikeIcon() {
    const likeButton = this._element.querySelector(".card__like-button");

    if (likeButton.classList.contains("card__like-button_active")) {
      this._api.dislikeCard(this._id).then(() => {
        likeButton.classList.remove("card__like-button_active");
      });
    } else {
      this._api.likeCard(this._id).then(() => {
        likeButton.classList.add("card__like-button_active");
      });
    }
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  _isOwner() {
    return this._userId === this._ownerId;
  }
  getView() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const likeButton = this._element.querySelector(".card__like-button");
    if (this._isOwner()) {
      deleteButton.style.display = "block";
    } else {
      deleteButton.style.display = "none";
    }
    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    }
    this._setEventListeners();
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}

export default Card;
