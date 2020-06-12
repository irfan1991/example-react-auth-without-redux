import React, { Component } from "react";
import ArticleDataService from "../services/article.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class ArticleList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveArticle = this.retrieveArticle.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.removeAllArticle = this.removeAllArticle.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      article: [],
      currentArticle: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveArticle();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveArticle() {
    ArticleDataService.getUser(AuthService.getCurrentUser().id)
      .then(response => {
        this.setState({
          article: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArticle();
    this.setState({
      currentArticle: null,
      currentIndex: -1
    });
  }

  setActiveArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index
    });
  }

  removeAllArticle() {
    console.log("tets");
    ArticleDataService.deleteUser(AuthService.getCurrentUser().id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    ArticleDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          article: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, article, currentArticle, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Articles List</h4>

          <ul className="list-group">
            {article &&
              article.map((arc, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticle(arc, index)}
                  key={index}
                >
                  {arc.title}
                </li>
              ))}
          </ul>

          <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllArticle}>
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentArticle ? (
            <div>
              <h4>Article</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentArticle.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentArticle.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentArticle.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/article/" + currentArticle.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Article...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
