<template>
	<v-touch class="addFriend" @swiperight="onSwipeRight" :swipe-options="{direction: 'right', threshold: 100}">
		<div class="header">
			<div class="back" @click="addfHide">
				<span class="icon icon-undo2"></span>
				<span class="font">返回</span>
			</div>
			<div class="title">添加</div>
		</div>
		<div class="add-search">
			<span class="icon icon-search"></span>
			<span class="font">QQ号/手机号/群</span>
		</div>
		<div class="function">
			<div class="func-div">
				<span class="icon icon-address-book"></span>
				<div class="font">添加手机联系人</div>
			</div>
			<div class="func-div">
				<span class="icon icon-qrcode"></span>
				<div class="font">扫一扫添加好友</div>
			</div>
			<div class="func-div">
				<span class="icon icon-bubbles2"></span>
				<div class="font face">
					<div class="face-top">面对面发起多人聊天</div>
					<div class="face-bottom">与身边的朋友进入同一个多人聊天</div>
				</div>
			</div>
		</div>
	</v-touch>
</template>

<script>
	export default {
		props: {
			addfShow: {
				type: Boolean
			}
		},
		data() {
			return {}
		},
		methods: {
			addfHide: function() {
				this.$emit('addfHide', !this.addfShow)
			},
			onSwipeRight: function() {
				this.$emit('addfHide', !this.addfShow)
			}
		}
	}
</script>

<style lang="less">
	.addFriend {
		width: 100%;
		height: 100%;
		background-color: #eee;
		z-index: 2000;
		.header {
			width: 100%;
			height: 50px;
			line-height: 50px;
			.back {
				position: absolute;
				left: 5px;
				top: 0;
				.icon {
					display: inline-block;
					vertical-align: top;
					margin-top: 17px;
				}
				.font {
					display: inline-block;
					font-size: 16px;
				}
			}
			.title {
				width: 40px;
				margin: 0 auto;
				font-size: 18px;
				font-weight: 600;
			}
		}
		.add-search {
			width: 100%;
			height: 40px;
			line-height: 40px;
			background-color: #fff;
			color: #ccc;
			font-size: 0;
			margin-bottom: 15px;
			.icon {
				display: inline-block;
				vertical-align: top;
				padding: 12px 10px 0;
				font-size: 16px;
			}
			.font {
				font-size: 16px;
			}
		}
		.function {
			background-color: #fff;
			.func-div {
				width: 100%;
				height: 50px;
				line-height: 50px;
				font-size: 0;
				border-bottom: 1px solid #ccc;
			}
			.icon {
				display: inline-block;
				font-size: 16px;
				width: 16px;
				height: 16px;
				padding: 0 14px;
				vertical-align: top;
				margin-top: 17px;
			}
			.font {
				display: inline-block;
				font-size: 16px;
			}
			.face {
				display: inline-flex;
				flex-direction: column;
				vertical-align: top;
				.face-top {
					height: 30px;
					line-height: 35px;
					font-size: 16px;
				}
				.face-bottom {
					height: 20px;
					line-height: 15px;
					font-size: 14px;
					color: #bbb;
				}
			}
		}
	}
</style>