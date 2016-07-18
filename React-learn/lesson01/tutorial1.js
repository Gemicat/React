var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>commentBox</h1>
                <CommentList />
                <CommentForm />
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, world! I am a commentList.
            </div>
        );
    }
})

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="CommentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);