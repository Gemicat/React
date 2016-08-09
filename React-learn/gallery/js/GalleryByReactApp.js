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
    
    /**
     * 点击处理函数
     * @param  当前点击的目标
     * @return {[type]}   [description]
     */
    handleClick: function(e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.stopPropagation();
        e.preventDefault();
    },

    render: function() {
        var imgFigureClassName = 'img-figure';
        var styleObj = {};

        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

        // 如果props属性中指定了这张图片的位置，则使用
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片旋转角度有值并且不为0，添加旋转角度
        if (this.props.arrange.rotate) {
            (['MozTransform', 'msTransform', 'WebkitTransform', 'transform']).forEach(function (value) {
                styleObj[value] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            }.bind(this));
        }

        // 如果是剧中的图片，z-index为11
        if (this.props.arrange.isCenter == true) {
            styleObj.zIndex = 11;
        }

        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title} />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back">{this.props.data.desc}</div>
                </figcaption>
            </figure>
        );
    }
});

/**
 * 控制组件
 */
var ControllerUnits = React.createClass({
    handleClick: function(e) {

        // 如果点击的图片是居中，则翻转图片，否则将相应的图片居中
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }

        e.preventDefault();
        e.stopPropagation();
    },

    render: function() {
        var controlelrUnitClassName = "controller-unit";

        // 如果图片居中，显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controlelrUnitClassName += " is-center";

            // 如果居中的同时，图片出于翻转状态
            if (this.props.arrange.isInverse) {
                controlelrUnitClassName += " is-inverse";
            }
        }

        return (
            <span className={controlelrUnitClassName} onClick={this.handleClick}></span>
        );
    }
});

/**
 * 获取区间内的一个随机值
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/**
 * 获取 0~30° 中间的一个随机正负数
 */
function get30DegRandom() {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

// 舞台搭建
var GalleryByReactApp = React.createClass({
    Constant: {
        centerPos: {
            left: 0,
            top: 0
        },
        hPosRange: { //水品方向的取值范围
            leftSecx: [0, 0],
            rightSecx: [0, 0],
            y: [0, 0]
        },
        vPosRange: { //竖直方向取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    },

    getInitialState: function() {
        return {
            imgsArrangeArr: [
            /**  这里是预定义的参数
                {
                    pos: {
                        left: '0',
                        top: '0'
                    },
                    rotate: 0, //旋转角度
                    isInverse: false, //图片正反面
                    isCenter: false //是否居中
                }
            */
            ]
        };
    },

    /**
     * 利用rearrange，居中相应的index图片
     * @param  需要居中的图片信息
     * @return {[type]}       [description]
     */
    center: function(index) {
        return function() {
            this.rearrange(index);
        }.bind(this);
    },

    /**
     * 根据index，翻转相应的图片
     * @param  需要翻转的图片
     * @return {[type]}       [description]
     */
    inverse: function(index) {
        return function() {
            var imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    },

    /**
     * 重新布局所有的图片
     * @param  需要居中图片的图片
     * @return {[type]}             [description]
     */
    rearrange: function(centerIndex) {
        var imgsArrangeArr = this.state.imgsArrangeArr;
        var Constant = this.Constant;
        var centerPos = Constant.centerPos;
        var hPosRange = Constant.hPosRange;
        var vPosRange = Constant.vPosRange;
        var hPosRangeLeftSecx = hPosRange.leftSecx;
        var hPosRangeRightSecx = hPosRange.rightSecx;
        var hPosRangeY = hPosRange.y;
        var vPosRangeX = vPosRange.x;
        var vPosRangeTopY = vPosRange.topY;

        var imgArrangeTopArr = [];
        var topImgNum = Math.floor(Math.random() * 2); //取一个或者不取
        var topImgSpliceIndex = 0;

        var imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先要居中 centerIndex 的图片，不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        }

        // 取出要放在上侧位置的图片信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧图片的位置
        imgArrangeTopArr.forEach(function(value, index) {
            imgArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }.bind(this));

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            // 前半部分放在左面，后半部分放在右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecx;
            } else {
                hPosRangeLORX = hPosRangeRightSecx;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            }
        }

        if (imgArrangeTopArr && imgArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr 
        });

    },

    // 组件加载完成之后，为每张图片计算位置范围
    componentDidMount: function() {

        // 获取舞台大小
        var stateDOM = ReactDOM.findDOMNode(this.refs.stage);
        var stageW = stateDOM.scrollWidth;
        var stageH = stateDOM.scrollHeight;
        var halfStageW = stageW / 2;
        var halfStageH = stageH / 2;

        // 拿到一个imageFigure的大小
        var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0);
        var imgW = imgFigureDOM.scrollWidth;
        var imgH = imgFigureDOM.scrollHeight;
        var halfImgW = imgW / 2;
        var halfImgH = imgH / 2;

        // 计算图片中心点的位置
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        }

        // 计算左侧、右侧区域图片排布位置的范围
        this.Constant.hPosRange.leftSecx[0] = -halfImgW;
        this.Constant.hPosRange.leftSecx[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecx[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecx[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgW;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的范围
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH- halfImgH * 3;

        this.rearrange(0);
    },

    render: function() {
        var ImgFigures = [];
        var controllerUnits = [];

        imageDatas.forEach (function(value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }

            ImgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}></ImgFigure>);
            controllerUnits.push(<ControllerUnits key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}></ControllerUnits>);
        }.bind(this))

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">{ImgFigures}</section>
                <nav className="controller-nav">{controllerUnits}</nav>
            </section>
        );
      }
});


ReactDOM.render(<GalleryByReactApp />, document.getElementById('content'));