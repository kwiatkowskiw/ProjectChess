exports.__esModule = true;
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _chessground = require('chessground');

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _extends() {
	var _extend =
		Object.assign ||
		function (target) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var key in source) {
					if (Object.prototype.hasOwnProperty.call(source, key)) {
						target[key] = source[key];
					}
				}
			}
			return target;
		};
	return _extend.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
	subClass.prototype = Object.create(superClass.prototype);
	subClass.prototype.constructor = subClass;
	subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		});
	} else {
		obj[key] = value;
	}
	return obj;
}

var Chessground =
	/*#__PURE__*/
	(function (_React$Component) {
		_inheritsLoose(Chessground, _React$Component);

		function Chessground() {
			return _React$Component.apply(this, arguments) || this;
		}

		var _proto = Chessground.prototype;

		_proto.buildConfigFromProps = function buildConfigFromProps(props) {
			var config = {
				events: {},
			};
			Object.keys(Chessground.propTypes).forEach(function (k) {
				var v = props[k];

				if (typeof v !== 'undefined') {
					var match = k.match(/^on([A-Z]\S*)/);

					if (match) {
						config.events[match[1].toLowerCase()] = v;
					} else {
						config[k] = v;
					}
				}
			});
			return config;
		};

		_proto.componentDidMount = function componentDidMount() {
			this.cg = (0, _chessground.Chessground)(
				this.el,
				this.buildConfigFromProps(this.props)
			);
		};

		_proto.componentWillReceiveProps = function componentWillReceiveProps(
			nextProps
		) {
			this.cg.set(this.buildConfigFromProps(nextProps));
		};

		_proto.componentWillUnmount = function componentWillUnmount() {
			this.cg.destroy();
		};

		_proto.render = function render() {
			var _this = this;

			var props = {
				style: _extends({}, this.props.style),
			};

			if (this.props.width) {
				props.style.width = this.props.width;
			}

			if (this.props.height) {
				props.style.height = this.props.height;
			}

			return _react['default'].createElement(
				'div',
				_extends(
					{
						ref: function ref(el) {
							return (_this.el = el);
						},
					},
					props
				)
			);
		};

		return Chessground;
	})(_react['default'].Component);

exports['default'] = Chessground;

_defineProperty(Chessground, 'propTypes', {
	width: _propTypes['default'].oneOfType([
		_propTypes['default'].string,
		_propTypes['default'].number,
	]),
	height: _propTypes['default'].oneOfType([
		_propTypes['default'].string,
		_propTypes['default'].number,
	]),
	fen: _propTypes['default'].string,
	orientation: _propTypes['default'].string,
	turnColor: _propTypes['default'].string,
	check: _propTypes['default'].string,
	lastMove: _propTypes['default'].array,
	selected: _propTypes['default'].string,
	coordinates: _propTypes['default'].bool,
	autoCastle: _propTypes['default'].bool,
	viewOnly: _propTypes['default'].bool,
	disableContextMenu: _propTypes['default'].bool,
	resizable: _propTypes['default'].bool,
	addPieceZIndex: _propTypes['default'].bool,
	highlight: _propTypes['default'].object,
	animation: _propTypes['default'].object,
	movable: _propTypes['default'].object,
	premovable: _propTypes['default'].object,
	predroppable: _propTypes['default'].object,
	draggable: _propTypes['default'].object,
	selectable: _propTypes['default'].object,
	onChange: _propTypes['default'].func,
	onMove: _propTypes['default'].func,
	onDropNewPiece: _propTypes['default'].func,
	onSelect: _propTypes['default'].func,
	items: _propTypes['default'].object,
	drawable: _propTypes['default'].object,
});

_defineProperty(Chessground, 'defaultProps', {
	coordinates: true,
	resizable: true,
	highlight: {
		lastMove: true,
		check: true,
	},
});
