import React, { Component } from "react";
import ArticleDataService from "../services/article.service";

export default class Article extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentArticle: {
        ...prevState.currentArticle,
        description: description
      }
    }));
  }

  getArticle(id) {
    console.log(id);
    ArticleDataService.get(id)
      .then(response => {
        this.setState({
          currentArticle: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentArticle.id,
      title: this.state.currentArticle.title,
      description: this.state.currentArticle.description,
      published: status
    };

    ArticleDataService.update(this.state.currentArticle.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentArticle: {
            ...prevState.currentArticle,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArticle() {
    ArticleDataService.update(
      this.state.currentArticle.id,
      this.state.currentArticle
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The article was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArticle() {    
    ArticleDataService.delete(this.state.currentArticle.id).then(response => {
        console.log(response);
        this.props.history.push('/article')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentArticle.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentArticle.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArticle.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentArticle.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArticle}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Article...</p>
          </div>
        )}
      </div>
    );
  }
}
