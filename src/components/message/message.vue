<template>
	<v-touch class="message" @tap="onTap($event)" :enabled="true">
		<div class="message-header">
			<div class="title">消息</div>
			<div class="more icon-plus" @click="moreShow = !moreShow"></div>

			<div class="fresh" id="fresh">
				<span class="icon icon-fresh" id="freshIcon"></span>
				<span class="font" id="freshFont">下拉刷新</span>
			</div>
		</div>

		<v-touch class="message-list"  @panstart='onPanStart($event)' @panmove="onPanMove($event)" @panend="onPanEnd($event)" :pan-options="{direction: 'vertical', threshold: 0}" :enabled="{pan: true, press: false, tap: false}">
			<div class="search-container">
				<div class="search-input" @click="searchShowF">
					<div class="wrapper">
						<span class="icon-search"></span>
						<span class="font-search">搜索</span>
					</div>
				</div>
			</div>	

			<transition-group name="slide" tag="ul" class="list-wrapper">
				<li v-for="item in message.messages" class='item' :key="item">
					<v-touch class="item-font" @swipeleft="onSwipeLeft($event)" @tap="goMsgDetail(item)" :swipe-options="{direction: 'left', threshold: 100}">
						<div class="avatar">
							<img class="img" :src="'/avatar/'+item.avatar" alt="">
						</div>
						<div class="item-top">
							<div class="from">{{item.who}}</div>
							<div class="time">{{item.time}}</div>
						</div>
						<div class="item-foot">
							<div class="content">{{item.content[item.content.length-1].content}}</div>
						</div>
					</v-touch>
					<div class="item-end">
						<div class="end-div setTop">置顶</div>
						<div class="end-div noRead" v-if="item.type == 'person'">标记未读</div>
						<div class="end-div msgDel">删除</div>
					</div>
				</li>
			</transition-group>
		</v-touch>
	
		<transition name="search">
			<search v-if="searchShow" @searchShowF="searchShowF"></search>
		</transition>

		<transition name="moreFunc">
			<div class="more-container" @click="moreShow = false" v-if="moreShow">
				<!-- <transition name='func'> -->
					<div class="functions" @click.stop="funcDeal($event)">
						<div class="more-div more-chat">
							<span class="icon icon-bubbles2"></span>
							<span class="more-font">发起多人聊天</span>
						</div>
						<div class="more-div more-addf">
							<span class="icon icon-user-plus"></span>
							<span class="more-font">加好友</span>	
						</div>
						<div class="more-div more-scan">
							<span class="icon icon-qrcode"></span>
							<span class="more-font">扫一扫</span>
						</div>
						<div class="more-div more-send">
							<span class="icon icon-display"></span>
							<span class="more-font">发送到电脑</span>
						</div>
					</div>
				<!-- </transition> -->
			</div>
		</transition>

		<transition name='addFriend'>
			<div class="add-container" v-if="addfShow">
				<addFriend :addfShow="addfShow" @addfHide="addfHide"></addFriend>
			</div>
		</transition>
	
		<transition name="msgDetail">
			<msgDetail :message="msgItem" @msgDetailHide="msgDetailHide" v-if="msgItem !== ''"></msgDetail>
		</transition>
	</v-touch>
</template>

<script>
  import axios from 'axios'
	import search from "@/components/search/search.vue"
	import addFriend from "@/components/addFriend/addFriend.vue"
	import msgDetail from "@/components/msgDetail/msgDetail.vue"

	export default {
		data() {
			return {
				message: {},
				moreShow: false,
				addfShow: false,
				// 某个已经左滑的块
				hadLeft: false,
				hadItem: '',
				// 传递消息至消息详情页
				msgItem: '',
				pageY: 0,
				searchShow: false,
			}
		},
		created() {
			axios.get('/api/message').then(res => {
        this.message = res.data.data
        console.log(this.message)
      })
		},
		methods: {
			onPanStart: function(e) {
				this.pageY = e.center.y
			},
			onPanMove: function(e) {
				let list = document.querySelector('.message-list')
				let distance = e.center.y - this.pageY
				if(distance >= 0) {            // 向下滑
					if(list.scrollTop > 0) {
						list.scrollTop = list.scrollTop - distance
						this.pageY = e.center.y
					} else {
						list.style.transform = "translateY(" + distance/3 + "px)"
						document.getElementById("fresh").style.top = (distance/3+10) + "px"
						if(distance/3 >= 40) {
							document.getElementById("freshFont").innerHTML = "松开刷新"
						}
					}
				} else {												// 向上滑
					if(list.scrollTop < list.scrollHeight - list.offsetHeight) {
						list.scrollTop = list.scrollTop - distance
						this.pageY = e.center.y
					} else {
						list.style.transform = "translateY(" + distance/3 + "px)"
					}
				}
			},
			onPanEnd: function(e) {
				let list = document.querySelector('.message-list')
				let distance = e.center.y - this.pageY
				// 向下滑
				if(distance >= 0) {
					if(list.scrollTop > distance) {
						list.scrollTop = list.scrollTop - distance

						list.style.transform = "none"
					} else {
						if(distance/3 >= 40) {
							list.style.transform = "translateY(40px)"
							document.getElementById("fresh").style.top = "50px"
							document.getElementById("freshIcon").style.transform = "rotate(1080deg)"

							setTimeout(function() {
								list.scrollTop = 0
								document.getElementById("fresh").style.top = "10px"
								document.getElementById("freshFont").innerHTML = "下拉刷新"
								document.getElementById("freshIcon").style.transform = "rotate(0deg)"
								list.style.transform = "none"
							}, 2100)
						} else {
							list.scrollTop = 0
							document.getElementById("fresh").style.top = "10px"
							list.style.transform = "none"
						}	
					}
				// 向上滑
				} else {
					distance = -distance
					if(distance > list.scrollHeight - list.offsetHeight - list.scrollTop) {
						list.scrollTop = list.scrollHeight - list.offsetHeight
					} else {
						list.scrollTop = list.scrollTop + distance
					}

					list.style.transform = "none"
				}
			},
			// 判断点击的功能
			funcDeal: function(event) {
				let classN = event.target.parentNode.className
				let func = classN.slice(-1)
				switch(func) {
					case 't': 
						console.log('t')
						break;
					case 'f': 
						this.moreShow = !this.moreShow
						this.addfShow = !this.addfShow
						break;
					case 'n': 
						alert('暂无此功能')
						break;
					case 'd': 
						alert('暂无此功能')
						break;
				}
			},
			// 回调隐藏add功能
			addfHide: function(data) {
				this.addfShow = data
			},
			// 监控左滑
			onSwipeLeft: function(e) {
				if(!this.hadLeft) {
					let div = this.judgeTarget(e.target)
					// 存储滑动的节点
					this.hadItem = div
					this.hadLeft = true
					// 判断该滑动多少距离
					let str = div.nextElementSibling.children[1].className
					if(/noRead/.test(str)) {
						div.style.left = '-240px'
					} else {
						div.style.left = '-140px'
					}
				} else {
					this.hadItem.style.left = '0'
					this.hadLeft = false
				}
			},
			// 处理左滑和无左滑的情况
			onTap: function(e) {
				if(this.hadLeft) {
					let className = e.target.className
					this.hadItem.style.left = '0'
					switch(className) {
						case 'end-div setTop': 
							console.log(1)
							this.hadLeft = false
							break
						case 'end-div noRead': 
							console.log(2)
							this.hadLeft = false
							break
						case 'end-div msgDel': 
							console.log(3)
							this.hadLeft = false
							break
						default:
							let div = this.judgeTarget(e.target)
							if(!div) {
								this.hadLeft = false
							}
							break
					}
				}
			},
			// 判断点击是哪个
			judgeTarget: function(target) {
				let aim = 'item-font'
				let div = ''
				if(target.parentNode.className === aim) {
					div = target.parentNode
				} else if(target.parentNode.parentNode.className === aim) {
					div = target.parentNode.parentNode
				} else if(target.className === aim) {
					div = target
				}
				return div
			},
			// 进入个人消息页
			goMsgDetail: function(item) {
				if(!this.hadLeft) {
					this.msgItem = item
				} else {
					this.hadItem.style.left = '0'
					this.hadLeft = false
				}
			},
			// 回调隐藏个人消息页
			msgDetailHide: function(data) {
				this.msgItem = data
			},
			searchShowF: function() {
				console.log(1)
				this.searchShow = !this.searchShow
			}
		},
		components: {
			search: search,
			addFriend: addFriend,
			msgDetail: msgDetail
		}
	}
</script>

<style lang="less">
	@import url('../../public/css/style.less');
	// .search {
	// 	transition: top .1s linear;
	// 	left: 0;
	// 	top: 0;
	// 	&.search-enter-active {
	// 		top: 0;
	// 	}
	// 	&.search-enter, &.search-leave-active {
	// 		top: 50px;
	// 	}
	// }
	.search-container {
		width: 100%;
		background-color: #fff;
		padding: 5px 0;
		z-index: 1200;
		.search-input {
			height: 30px;
			line-height: 30px;
			border: none;
			border-radius: 5px;
			background-color: #eee;
			margin: 0 5px;
			.wrapper {
				width: 55px;
				margin: 0 auto;
				color: #aaa;
				.icon-search {
					display: inline-block;
					vertical-align: top;
					margin-top: 8px;
				}
				.font-search {
					display: inline-block;
					font-size: 14px;
				}
			}
		}
	}

	.message {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		min-height: 100%;
		.message-header {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #3385ff;
			color: #fff;
			z-index: 900;
			.title {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				text-align: center;
				font-weight: 600;
				font-size: 18px;
				background-color: #3385ff;
				z-index: 900;
			}
			.more {
				position: absolute;
				right: 10px;
				top: 10px;
				padding: 7px;
				z-index: 901;
			}
			.fresh {
				position: absolute;
				left: 0;
				top: 10px;
				width: 100%;
				height: 40px;
				line-height: 40px;
				text-align: center;
				font-size: 0;
				z-index: 800;
				color: #000;
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 16px;
					height: 16px;
					margin-top: 12px;
					padding: 0 5px;
					font-size: 16px;
					transform: rotate(0);
					transition: transform 2s;
				}
				.font {
					font-size: 16px;
				}
			}
		}
		.message-list {
			flex: 1;
			width: 100%;
			margin-bottom: 49px;
			overflow-y: auto;
			.item {
				display: block;
				position: relative;
				width: 100%;
				height: 70px;
				background-color: #fff;
				border-bottom: 1px solid #ccc;
				.item-font {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: #fff;
					z-index: 500;
					transition: all .5s;
				}
				.avatar {
					position: absolute;
					width: 70px;
					height: 71px;
					left: 0;
					top: -1px;
					background-color: #fff;
					.img {
						position: absolute;
						left: 10px;
						top: 10px;
						width: 50px;
						height: 50px;
						border-radius: 25px;
					}
				}
				.item-top {
					position: absolute;
					left: 0;
					top: 15px;
					width: 100%;
					height: 20px;
					line-height: 20px;
					.from {
						position: absolute;
						left: 70px;
						top: 0;
						font-size: 17px;
						font-weight: 600;
					}
					.time {
						position: absolute;
						right: 10px;
						top: 0;
						font-size: 14px;
						color: #ccc;
					}
				}
				.item-foot {
					position: absolute;
					left: 0px;
					top: 35px;
					width: 100%;
					height: 20px;
					line-height: 20px;
					font-size: 14px;
					color: #aaa;
					.content {
						position: absolute;
						left: 70px;
					}
				}
				.item-end {
					position: absolute;
					right: 1px;
					top: 0;
					font-size: 0;
					z-index: 100;
					.end-div {
						display: inline-block;
						width: 70px;
						height: 68px;
						line-height: 68px;
						margin-top: 1px;
						text-align: center;
						font-size: 18px;
						color: #fff;
					}
					.setTop {
						background-color: #ccc;
					}
					.noRead {
						width: 100px;
						background-color: #f90;
					}
					.msgDel {
						background-color: #f00;
					}
				}
			}
		}
		.more-container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
			z-index: 2000;
			transition: all .5s;
			.functions {
				position: absolute;
				top: 60px;
				right: 8px;
				border-radius: 5px;
				background-color: #fff;
				// transition: all .5s;
				&:after {
					content: '';
					position: absolute;
					right: 7px;
					top: -20px;
					border: 10px solid transparent;
					border-bottom: 10px solid #fff;
				}
				.more-div {
					height: 40px;
					line-height: 40px;
					font-size: 0;
					.icon {
						display: inline-block;
						vertical-align: top;
						margin-top: 12px;
						padding: 0 12px;
						font-size: 16px;
					}
					.more-font {
						display: inline-block;
						height: 24px;
						line-height: 24px;
						font-size: 16px;
						margin-top: 8px;
						padding-right: 10px;
					}
				}
				// &.func-enter-active {
				// 	transform: scale(1.0);
				// }
				// &.func-enter, &.func-leave-active {
				// 	transform: scale(0);
				// }
			}
			&.moreFunc-enter-active {
				opacity: 1;
			}
			&.moreFunc-enter, &.moreFunc-leave-active {
				opacity: 0;
			}
		}
		.add-container {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			transition: all 0.5s;
			z-index: 3000;
			&.addFriend-enter-active {
				left: 0;
			}
			&.addFriend-enter, &.addFriend-leave-active {
				left: 100%;
			}
		}
		.msgDetail {
			position: absolute;
			left: 0;
			top: 0;
			transition: left .5s;
			&.msgDetail-enter-active {
				left: 0;
			}
			&.msgDetail-enter, &.msgDetail-leave-active {
				left: 100%;
			}
		}
	}
</style>