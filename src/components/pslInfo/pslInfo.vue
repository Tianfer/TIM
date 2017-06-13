<template>
	<div class="pslInfo">
		<div class="psl-header">
			<div class="back" @click="pslInfoHide">
				<span class="icon icon-undo2"></span>
				<span class="title"></span>
				<span class="font">返回</span>
			</div>
			<div class="more">更多</div>
		</div>
		<!-- <img class="psl-avatar" src="/avatar/dog.png" alt="avatar"> -->
		<v-touch class="psl-content" @swiperight="onSwipeRight" :swipe-options="{direction: 'right', threshold: 100}">
			<div class="psl-avatar" :style="{backgroundImage: 'url(/avatar/'+InforM.avatar+')'}">
				<div class="username">
					<div class="name">{{InforM.name}}</div>
					<div class="sign">{{InforM.sign}}</div>
				</div>
			</div>
			<div class="item-wrap border-bottom">
				<div class="item" v-for="item in InforM.inner">
					<div class="item-top">{{item.type}}</div>
					<div class="item-bot">{{item.content}}</div>
					<div class="icon-redo2" v-if="item.right"></div>
				</div>
			</div>

			<div class="divider"></div>

			<div class="item-wrap border-bottom border-top">
				<div class="item" v-for="item in InforM.more">
					<div class="item-top">{{item.type}}</div>
					<div class="item-bot">{{item.content}}</div>
					<div class="icon-redo2"></div>
				</div>
			</div>

			<div class="space" v-if="!InforM.myself"></div>
		</v-touch>

		

		<div class="footer" v-if="!InforM.myself">
			<div class="talk">QQ电话</div>
			<div class="msg" @click="send()">发消息</div>
		</div>

		<transition name="msgDetail">
			<msgDetail :message="InforM.message" @msgDetailHide="msgDetailHide" v-if="msgDShow"></msgDetail>
		</transition>
	</div>
</template>

<script>
	import msgDetail from "@/components/msgDetail/msgDetail.vue"

	export default {
		props: {
			InforM: {
				type: Object
			}
		},
		data() {
			return {
				msgDShow: false
			}
		},
		created() {
			console.log(this.InforM)
		},
		methods: {
			pslInfoHide: function() {
				this.$emit('pslHideF', false)
			},
			onSwipeRight: function() {
				this.$emit('pslHideF', false)
			},
			send: function() {
				this.msgDShow = !this.msgDShow
			},
			msgDetailHide: function() {
				this.msgDShow = !this.msgDShow
			}
		},
		components: {
			msgDetail: msgDetail
		}
	}
</script>

<style lang="less">
	.pslInfo {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #eee;
		z-index: 1100;
		.psl-header {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 50px;
			line-height: 50px;
			z-index: 1111;
			.back {
				position: absolute;
				left: 0;
				top: 0;
				font-size: 0;
				.icon {
					display: inline-block;
					vertical-align: top;
					width: 24px;
					height: 50px;
					line-height: 50px;
					font-size: 16px;
					text-align: center;
				}
				.font {
					font-size: 16px;
				}
			}
			.more {
				position: absolute;
				right: 10px;
				top: 0;
			}
		}
		.psl-content {
			width: 100%;
			height: 100%;
			overflow: auto;
		}
		.psl-avatar {
			position: relative;
			width: 100%;
			height: 240px;
			background-position: center;
			background-repeat: no-repeat;
			background-size: 100% auto;
			.username {
				position: absolute;
				left: 15px;
				bottom: 15px;
				text-align: left;
				.name {
					height: 32px;
					line-height: 32px;
					font-size: 27px;
				}
				.sign {
					font-size: 12px;
				}
			}
		}
		.item {
			position: relative;
			width: 100%;
			height: 65px;
			background-color: #fff;
			overflow: hidden;
			&:last-child .item-bot {
				border-bottom: none;
			}
			.item-top {
				height: 30px;
				line-height: 40px;
				font-size: 14px;
				color: #999;
				padding-left: 15px;
			}
			.item-bot {
				width: 100%;
				height: 34px;
				line-height: 30px;
				margin-left: 15px;
				border-bottom: 1px solid #ccc;
			}
			.item-last {
				padding-left: 15px;
				margin-left: 0;
			}
			.icon-redo2 {
				position: absolute;
				right: 15px;
				top: 0;
				height: 65px;
				line-height: 65px;
				font-size: 20px;
				color: #999;
			}
		}
		.divider {
			width: 100%;
			height: 20px;
		}
		.space {
			width: 100%;
			height: 50px;
		}
		.footer {
			position: absolute;
			left: 0;
			bottom: 0;
			display: flex;
			width: 100%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			.talk {
				width: 50%;
				background-color: #fff;
			}
			.msg {
				width: 50%;
				background-color: #3385ff;
			}
		}
		.msgDetail {
			&.msgDetail-enter-active {
				left: 0;
			}
			&.msgDetail-enter, &.msgDetail-leave-active {
				left: 100%;
			}
		}
	}
</style>