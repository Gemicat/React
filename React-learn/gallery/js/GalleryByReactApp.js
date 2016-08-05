'use strict';

var imageDatas = [
  {
    "fileName": "1.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer."
  },
  {
    "fileName": "2.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer."
  },
  {
    "fileName": "3.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer."
  },
  {
    "fileName": "4.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "5.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "6.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "7.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "8.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "9.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "10.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "11.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer. "
  },
  {
    "fileName": "12.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer.  "
  },
  {
    "fileName": "13.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer.  "
  },
  {
    "fileName": "14.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer.  "
  },
  {
    "fileName": "15.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer.  "
  },
  {
    "fileName": "16.jpg",
    "title": "Heaven of time",
    "desc": "Here he comes Here comes Speed Racer.  "
  }
];

// 利用自执行函数，将图片信息转换为图片URL路径
imageDatas = (function getImageURL(imageDatasArr) {

    for (var i = 0, j = imageDatasArr.length; i < j; i++) {

        var singleImageData = imageDatasArr[i];
        singleImageData.imageURL = 'img/' + singleImageData.fileName;
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;

})(imageDatas);


console.log(imageDatas);

// 图片组件
var ImgFigure = React.createClass({
    render: function() {
        var imgFigureClassName = 'img-figure';
        var styleObj = {};

        // 如果props

        return (
            <figure className={imgFigureClassName}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back">{this.props.data.desc}</div>
                </figcaption>
            </figure>
        );
    }
});

// 舞台搭建
var GalleryByReactApp = React.createClass({
    render: function() {
        var ImgFigures = [];

        imageDatas.forEach (function(value, index) {
            ImgFigures.push(<ImgFigure data={value}></ImgFigure>)
        })

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">{ImgFigures}</section>
            </section>
        );
      }
});


ReactDOM.render(<GalleryByReactApp />, document.getElementById('content'));