import React, {
	Component,
	PropTypes
} from 'react';

import { MenuItem, Drawer } from 'material-ui';
import { grey800, grey50 } from 'material-ui/styles/colors';

export default class ChapterSidebar extends Component {
	static propTypes = {
		onChapterItemClick: PropTypes.function,
		chapters: PropTypes.array,
		drawerAutoClose: PropTypes.boolean
	}

	constructor(props) {
		super(props);
		this.state = {
			drawerOpen: false
		};
	}

	getDefaultProps() {
		return {
			drawerAutoClose: false
		};
	}

	onChapterItemClick = (chapterItem) => {
		const { onChapterItemClick, drawerAutoClose } = this.props;
		return () => {
			if (drawerAutoClose) { this.setState({drawerOpen: false}); }

			onChapterItemClick(chapterItem)();
		};
	}

	render() {
		const { chapters } = this.props;

		return(
			<Drawer
				open={this.state.drawerOpen}
				docked={true}
				// onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
				openSecondary={true}
				containerStyle={{marginTop: 80, height: 'calc(100% - 96px)', width: 300}}
			>
				<MenuItem
					style={{backgroundColor: grey800, color: grey50, height: 64, fontSize: 24, paddingTop: '.5rem'}}
					onClick={() => this.setState({drawerOpen: !this.state.drawerOpen})}
					innerDivStyle={{paddingLeft: 8}}
				>
					<i className="material-icons" style={{fontSize: 30, verticalAlign: 'middle'}}>keyboard_arrow_left</i>
					章節
				</MenuItem>
				{
					chapters.map((chapterItem) => {
						// var style = (this.state.viewingCID === chapterItem.cid) ? { backgroundColor: 'rgba(0, 0, 0, 0.098)' } : {};
						return(
							<MenuItem
								// onClick={this.handleChapterClick(chapterItem)}
								onClick={this.onChapterItemClick(chapterItem)}
								// style={style}
								innerDivStyle={{paddingLeft: 37}}
							>
								{chapterItem.title}
							</MenuItem>
						);
					})
				}
			</Drawer>
		);
	}
}
