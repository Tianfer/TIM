<template>
	<div class="relation">
		<div class="relation-header">
			<div class="header-title">联系人</div>
			<div class="header-add" @click='addShow'>添加</div>

			<div class="fresh" id="fresh">
				<span class="icon icon-fresh" id="freshIcon"></span>
				<span class="font" id="freshFont">下拉刷新</span>
			</div>
		</div>
		<v-touch class="content" @panstart='onPanStart($event)' @panmove="onPanMove($event)" @panend="onPanEnd($event)" :pan-options="{direction: 'vertical', threshold: 0}" :enabled="{pan: true, press: false, tap: false}">
			<div class="search-container">
				<div class="search-input" @click="searchShowF">
					<div class="wrapper">
						<span class="icon-search"></span>
						<span class="font-search">搜索</span>
					</div>
				</div>
			</div>
			<div class="content-top">
				<div class="content-top-div newFriends" @click="newShow">
					<div class="icon icon-user-plus"></div>
					<div class="font">新朋友</div>
				</div>
				<div class="content-top-div talkGroup" @click="groupShow">
					<div class="icon icon-users"></div>
					<div class="font">群聊</div>
				</div>
			</div>
			<div class="content-mdl">
				<ul class="item-wrap">
					<li class="item" v-for="item in relation.top" @click="showUserList($event)">
						<span class="icon icon-right"></span>
						<span class="item-name">{{item.name}}</span>
						<div class="container">
							<span class="item-num">{{computeNum(item.inner)}}</span>
							<span class="item-num" v-if="typeof(item.inner) === 'object'">/{{item.inner.length}}</span>
						</div>
						<div class="userlist-wrap" v-if="typeof(item.inner) === 'object'">
							<div class="userlist" v-for="item in item.inner" @click.stop="pslInfoF($event)">
								<img class="userlist-img" :src="'/avatar/dog.png'" alt="头像">
								<div class="userlist-outline" v-if="/离线/.test(item.statu)"></div>
								<div class="userlist-name">{{item.name}}</div>
								<div class="userlist-statu">{{item.statu}}</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="divider"></div>
				<ul class="item-wrap">
					<li class="item" v-for="item in relation.center" @click="showUserList($event)">
						<span class="icon icon-right"></span>
						<span class="item-name">{{item.name}}</span>
						<div class="container">
							<span class="item-num">{{computeNum(item.inner)}}</span>
							<span class="item-num" v-if="typeof(item.inner) === 'object'">/{{item.inner.length}}</span>
						</div>

						<div class="userlist-wrap" v-if="typeof(item.inner) === 'object'">
							<div class="userlist" v-for="item in item.inner" @click.stop="pslInfoF(item.info)">
								<img class="userlist-img" :src="'/avatar/'+item.avatar" alt="头像">
								<div class="userlist-outline" v-if="/离线/.test(item.statu)"></div>
								<div class="userlist-name">{{item.name}}</div>
								<div class="userlist-statu">{{item.statu}}</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="divider"></div>
				<ul class="item-wrap">
					<li class="item" v-for="item in relation.bottom" @click="showUserList($event)">
						<span class="icon icon-right"></span>
						<span class="item-name">{{item.name}}</span>
						<div class="container">
							<span class="item-num">{{computeNum(item.inner)}}</span>
							<span class="item-num" v-if="typeof(item.inner) === 'object'">/{{item.inner.length}}</span>
						</div>
						<div class="userlist-wrap" v-if="typeof(item.inner) === 'object'">
							<div class="userlist" v-for="item in item.inner" @click.stop="pslInfoF($event)">
								<img class="userlist-img" :src="'/avatar/'+item.avatar" alt="头像">
								<div class="userlist-outline" v-if="/离线/.test(item.statu)"></div>
								<div class="userlist-name">{{item.name}}</div>
								<div class="userlist-statu">{{item.statu}}</div>
							</div>
						</div>
					</li>
				<div class="divider"></div>
				</ul>
			</div>	
		</v-touch>

		<transition name="new">
			<v-touch v-if="newfShow" class="newFriend" @swiperight="onSwipeRight" :swipe-options="{direction: 'right', threshold: 100}">
				<div class="new-header">
					<div class="back" @click="newShow">
						<span class="icon icon-undo2"></span>
						<span class="font">联系人</span>
					</div>
					<div class="title">新朋友</div>
					<div class="add" @click='addShow'>添加</div>
				</div>
				<div class="new-content">
					<div class="wrap">
						<span class="type">好友申请</span>
						<img class="avatar" :src="'/avatar/dog.png'" alt="avatar">
						<span class="name">翩若惊鸿</span>
						<span class="content">请求加为好友</span>
						<span class="from">来源：条件查找</span>
						<span class="deal">已忽略</span>
					</div>
				</div>
			</v-touch>
		</transition>

		<transition name="group">
			<div class="groupTalk" v-if="grouptShow">
				<div class="header">
					<div class="back" @click="groupShow">
						<span class="icon icon-undo2"></span>
						<span class="font">联系人</span>
					</div>
					<div class="title">群聊</div>
				</div>
				<div class="group-type">
					<div class="group" @click="underLine($event)">我的群</div>
					<div class="group" @click="underLine($event)">多人聊天</div>
				</div>
				<search></search>
				<v-touch class="group-content" @swiperight="onGroupRight"></v-touch>
			</div>
		</transition>

		<transition name="add">
			<addFriend v-if="addfShow" :addfShow="addfShow" @addfHide="addfHide"></addFriend>
		</transition>

		<transition name='psl'>
			<pslInfo v-if="pslShow" :InforM="info" @pslHideF="pslHideF"></pslInfo>
		</transition>

		<transition name="search">
			<search v-if="searchShow" @searchShowF="searchShowF"></search>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios'
	import search from "@/components/search/search.vue"
	import addFriend from "@/components/addFriend/addFriend.vue"
	import pslInfo from "@/components/pslInfo/pslInfo.vue"

	export default {
		props: {
		
		},
		data() {
			return {
				relation: '',
				addfShow: false,
				newfShow: false,
				grouptShow: false,
				tranY: 0,
				pageY: 0,
				pslShow: false,
				info: '',
				searchShow: false,
			}
		},
		created() {
			axios.get('/api/relation').then(res => {
        this.relation = res.data.data
        console.log(this.relation)
      })
		},
		methods: {
			onPanStart: function(e) {
				this.pageY = e.center.y
			},
			onPanMove: function(e) {
				let con = document.querySelector('.content')
				let distance = e.center.y - this.pageY
				if(distance >= 0) {            // 向下滑
					if(con.scrollTop > 0) {
						con.scrollTop = con.scrollTop - distance
						this.pageY = e.center.y
					} else {
						con.style.transform = "translateY(" + distance/3 + "px)"
						document.getElementById("fresh").style.top = (distance/3+10) + "px"
						if(distance/3 >= 40) {
							document.getElementById("freshFont").innerHTML = "松开刷新"
						}
					}
				} else {												// 向上滑
					if(con.scrollTop < con.scrollHeight - con.offsetHeight) {
						con.scrollTop = con.scrollTop - distance
						this.pageY = e.center.y
					} else {
						con.style.transform = "translateY(" + distance/3 + "px)"
					}
				}
			},
			onPanEnd: function(e) {
				let content = document.querySelector('.content')
				let distance = e.center.y - this.pageY
				// 向下滑
				if(distance >= 0) {
					if(content.scrollTop > distance) {
						content.scrollTop = content.scrollTop - distance

						content.style.transform = "none"
					} else {
						if(distance/3 >= 40) {
							content.style.transform = "translateY(40px)"
							document.getElementById("fresh").style.top = "50px"
							document.getElementById("freshIcon").style.transform = "rotate(1080deg)"

							setTimeout(function() {
								content.scrollTop = 0
								document.getElementById("fresh").style.top = "10px"
								document.getElementById("freshFont").innerHTML = "下拉刷新"
								document.getElementById("freshIcon").style.transform = "rotate(0deg)"
								content.style.transform = "none"
							}, 2100)
						} else {
							content.scrollTop = 0
							document.getElementById("fresh").style.top = "10px"
							content.style.transform = "none"
						}	
					}
				// 向上滑
				} else {
					distance = -distance
					if(distance > content.scrollHeight - content.offsetHeight - content.scrollTop) {
						content.scrollTop = content.scrollHeight - content.offsetHeight
					} else {
						content.scrollTop = content.scrollTop + distance
					}

					content.style.transform = "none"
				}
			},
			computeNum: function(data) {
				if(typeof data === 'string') {
					return data
				} else if(data.length === 0) {
					return 0
				} else {
					let l = data.length
					let online = 0
					let statu = /离线/
					for(let i = 0; i < l; i++) {
						if(!statu.test(data[i].statu)) {
							online++
						}
					}
					return online
				}
			},
			showUserList: function(e) {
				let target = e.target
				let div = ''
				if(target.className === 'item') {
					div = e.target
				} else if(target.parentNode.className === 'item') {
					div = e.target.parentNode
				} else {
					div = e.target.parentNode.parentNode
				}
				let turn = div.children[0].className
				if(/right/.test(turn)) {
					div.children[0].className = 'icon icon-down'
					if(div.children[3] && div.children[3].children.length > 0) {
						let length = div.children[3].children.length
						div.style.borderBottom = 'none'
						div.style.marginBottom = 60 * length + 'px'
						div.children[3].style.display = 'block'
					}
				} else {
					div.children[0].className = 'icon icon-right'
					div.style.borderBottom = '1px solid #ccc'
					div.style.marginBottom = '0'
					if(div.children[3]) {
						div.children[3].style.display = 'none'
					}
				}
			},
			addShow: function() {
				this.addfShow = !this.addfShow
			},
			addfHide: function(data) {
				this.addfShow = data
			},
			newShow: function() {
				this.newfShow = !this.newfShow
			},
			onSwipeRight: function() {
				this.newfShow = !this.newfShow
			},
			groupShow: function() {
				this.grouptShow = !this.grouptShow
			},
			onGroupRight: function() {
				this.grouptShow = !this.grouptShow
			},
			underLine: function(e) {
				let div = e.target
				let group = document.querySelectorAll('.group')
				for(let i = 0, l = group.length; i < l; i++) {
					group[i].style.borderBottom = '1px solid #ccc'
				}
				div.style.borderBottom = "2px solid #000"
			},
			pslInfoF: function(data) {
				this.info = data
				this.pslShow = !this.pslShow
			},
			pslHideF: function(data) {
				this.pslShow = data
			},
			searchShowF: function() {
				console.log(1)
				this.searchShow = !this.searchShow
			}
		},
		components: {
			search: search,
			addFriend: addFriend,
			pslInfo: pslInfo,
		}
	}
</script>

<style lang="less">
	@import url('../../public/css/style.less');

	.relation {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #eee;
		.relation-header {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 50px;
			background-color: #3385ff;
			color: #fff;
			text-align: center;
			z-index: 900;
			.header-title {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 18px;
				background-color: #3385ff;
				z-index: 900;
			}
			.header-add {
				position: absolute;
				right: 15px;
				top: 0;
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
		.content {
			flex: 1;
			margin-bottom: 50px;
			overflow: auto;
			z-index: 800;
			.content-top {
				width: 100%;
				height: 80px;
				margin-bottom: 15px;
				background-color: #fff;
				.content-top-div {
					float: left;
					width: 50%;
					text-align: center;
				}
				.icon {
					width: 100%;
					height: 60px;
					line-height: 60px;
					font-size: 24px;
				}
				.font {
					height: 20px;
					line-height: 1px;
					font-size: 14px;
				}
			}
			.content-mdl {
				width: 100%;
				background-color: #fff;
				.divider {
					width: 100%;
					height: 15px;
					background-color: #eee;
				}
				.item-wrap {
					display: block;
					width: 100%;
					.item {
						position: relative;
						width: 100%;
						height: 50px;
						line-height: 50px;
						font-size: 0;
						border-bottom: 1px solid #ccc;
						&:first-child {
							border-top: 1px solid #ccc;
						}
						.icon {
							padding: 0 5px;
							font-size: 16px;
							color: #888;
						}
						.item-name {
							font-size: 16px;
						}
						.userlist-wrap {
							display: none;
							position: absolute;
							left: 0;
							top: 51px;
							width: 100%;
							font-size: 16px;
							.userlist {
								position: relative;
								width: 100%;
								height: 60px;
								line-height: 60px;
								background-color: #fff;
								overflow: hidden;
								.userlist-img {
									position: absolute;
									left: 5px;
									top: 5px;
									width: 50px;
									height: 50px;
									border-radius: 25px;
								}
								.userlist-outline {
									position: absolute;
									left: 5px;
									top: 5px;
									width: 50px;
									height: 50px;
									border-radius: 25px;
									background-color: rgba(255, 255, 255, 0.4);
								}
								.userlist-name {
									position: absolute;
									left: 60px;
									top: 0;
									height: 35px;
									line-height: 35px;
									font-size: 17px;
									font-weight: 600;
								}
								.userlist-statu {
									position: absolute;
									left: 60px;
									top: 30px;
									width: 100%;
									height: 24px;
									line-height: 24px;
									font-size: 13px;
									color: #ccc;
									border-bottom: 1px solid #ddd;
								}
								&:last-child .userlist-statu {
									border-bottom: none;
								}
							}
						}
						.container {
							position: absolute;
							height: 50px;
							line-height: 50px;
							right: 15px;
							top: 0;
							font-size: 0;
							.item-num {
								font-size: 12px;
								color: #888;
							}
						}
					}	
				}
			}
		}
		.addFriend {
			position: absolute;
			left: 0;
			top: 0;
			transition: left 0.5s ease;
			&.add-enter-active {
				left: 0;
			}
			&.add-enter, &.add-leave-active {
				left: 100%;
			}
		}
		.newFriend {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: #fff;
			transition: left .5s;
			background-color: #eee;
			z-index: 1100;
			&.new-enter-active {
				left: 0;
			}
			&.new-enter, &.new-leave-active {
				left: 100%;
			}
			.new-header {
				position: relative;
				width: 100%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				background-color: #eee;
				.back {
					position: absolute;
					left: 0;
					top: 0;
					font-size: 0;
					.icon {
						display: inline-block;
						vertical-align: top;
						margin-top: 17px;
						font-size: 16px;
						padding: 0 5px;
					}
					.font {
						font-size: 16px;
					}
				}
				.title {
					font-size: 20px;
					font-weight: 600;
				}
				.add {
					position: absolute;
					right: 10px;
					top: 0;
				}
			}
			.wrap {
				position: relative;
				width: 100%;
				height: 100px;
				background-color: #fff;
				.type {
					position: absolute;
					height: 20px;
					line-height: 20px;
					left: 10px;
					top: 5px;
					font-size: 13px;
					color: #999;
				}
				.avatar {
					position: absolute;
					left: 10px;
					top: 30px;
					width: 60px;
					height: 60px;
					border-radius: 30px;
				}
				.name {
					position: absolute;
					left: 80px;
					top: 35px;
					height: 20px;
					line-height: 18px;
					font-size: 17px;
				}
				.content {
					position: absolute;
					left: 80px;
					top: 55px;
					height: 15px;
					line-height: 15px;
					font-size: 13px;
				}
				.from {
					position: absolute;
					left: 80px;
					top: 72px;
					height: 15px;
					line-height: 15px;
					font-size: 13px;
					color: #999;
				}
				.deal {
					position: absolute;
					right: 20px;
					top: 0;
					height: 100px;
					line-height: 100px;
					font-size: 14px;
					color: #999;
				}
			}
		}
		.groupTalk {
			display: flex;
			flex-direction: column;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: #eee;
			z-index: 1100;
			transition: left .5s ease;
			&.group-enter-active {
				left: 0;
			}
			&.group-enter, &.group-leave-active {
				left: 100%;
			}
			.header {
				position: relative;
				width: 100%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				.back {
					position: absolute;
					left: 0;
					top: 0;
					font-size: 0;
					.icon {
						display: inline-block;
						vertical-align: top;
						margin-top: 17px;
						font-size: 16px;
						padding: 0 5px;
					}
					.font {
						font-size: 16px;
					}
				}
				.title {
					font-size: 18px;
					font-weight: 600;
				}
			}
			.group-type {
				display: flex;
				width: 100%;
				height: 40px;
				line-height: 40px;
				background-color: #fff;
				border-top: 1px solid #ccc;
				.group {
					width: 50%;
					text-align: center;
					border-bottom: 1px solid #ccc;
					&:first-child {
						border-bottom: 2px solid #000;
					}
				}
			}
			.group-content {
				flex: 1;
			}
		}
		.pslInfo {
			transition: left .5s;
			&.psl-enter-active {
				left: 0;
			}
			&.psl-enter, &.psl-leave-active {
				left: 100%;
			}
		}
	}
</style>