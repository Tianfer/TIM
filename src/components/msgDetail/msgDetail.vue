<template>
	<div class="msgDetail">
		<div class="header">
			<div class="header-back" @click="msgDetailHide">
				<span class="icon icon-undo2"></span>
				<span class="header-font">消息</span>
			</div>
			<div class="header-title">{{message.who}}</div>
			<div class="header-func">
				<span class="icon icon-phone"></span>
				<span class="icon icon-user"></span>
			</div>
		</div>
		<v-touch class="msg-content" @swiperight="onSwipeRight" :swipe-options="{direction: 'right', threshold: 100}">
			<div class="msg-item" :class="[item.from == 1 ? 'other' : 'self']" v-for="item in message.content">
				<img v-if="item.from === 1" class="avatar" :src="'/avatar/'+message.avatar" alt="avatar">
				<img v-else class="avatar" src="/avatar/dog.png" alt="avatar">
				<div class="con">
					<span class="con-font" v-if="!/\<img/.test(item.content)">{{item.content}}</span>
					<img v-else class="con-img" :src="item.content.split('\'')[1]">
				</div>
			</div>
		</v-touch>
		<div class="msg-footer">
			<div class="footer-input">
				<input id="input" class="input" type="text">
			</div>
			<div class="footer-icon">
				<div class="icon-wrapper">
					<span class="icon icon-mic"></span>
					<span class="icon icon-image"></span>
					<span class="icon icon-camera"></span>
					<span class="icon icon-video-camera"></span>
					<span class="icon icon-smile"></span>
					<span class="icon icon-plus"></span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default {
		props: {
			message: {
				type: Object
			}
		},
		created: function() {
			console.log(this.message)
		},
		mounted: function() {
			let input = document.getElementById("input")
			window.addEventListener('keydown', function(event) {
				if(event.keyCode === 13 && input.value !== "") {
					document.querySelector('.msg-content').innerHTML += "<div class='msg-item self'><img class='avatar' src='/avatar/dog.png'><div class='con'><span class='con-font'>"+input.value+"</span></div></div>"
					
					input.value = ''
				}
			}, false)
		},
		methods: {
			// 退回至总消息页
			msgDetailHide: function() {
				this.$emit('msgDetailHide', '')
			},
			// 退回至总消息页
			onSwipeRight: function() {
				this.$emit('msgDetailHide', '')
			}
		}
	}
</script>

<style lang="less">
	.con-font {
		position: relative;
		display: inline-block;
		line-height: 20px;
		padding: 15px;
		border-radius: 15px;
	}
	.other {
		flex-direction: row;
		.con-font {
			color: #000;
			background-color: #fff;
			&:after {
				content: "";
				position: absolute;
				left: -8px;
				top: 10px;
				border-width: 5px 5px;
				border-style: solid;
				border-color: transparent;
				border-right: 5px solid #fff;
				border-top: 5px solid #fff;
			}
		}
	}
	.self {
		flex-direction: row-reverse;
		.con-font {
			max-width: 100%;
			min-height: 18px;
			line-height: 18px;
			word-wrap: break-word;
			float: right;
			color: #fff;
			background-color: #3385ff;
			&:after {
				content: "";
				position: absolute;
				right: -8px;
				top: 10px;
				border-width: 5px 5px;
				border-style: solid;
				border-color: transparent;
				border-left: 5px solid #3385ff;
				border-top: 5px solid #3385ff;
			}
		}
	}
	.con-img {
		float: right;
		border-radius: 10px;
	}
	.msgDetail {
		position: absolute;
		left: 0;
		top: 0;
		transition: left .5s;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #fff;
		z-index: 1200;
		overflow: auto;
		.header {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 50px;
			font-size: 0;
			background-color: #fff;
			z-index: 1000;
			.header-back {
				position: absolute;
				left: 0;
				top: 0;
				.icon {
					display: inline-block;
					vertical-align: top;
					margin-top: 17px;
					font-size: 16px;
					padding: 0 4px;
				}
				.header-font {
					font-size: 16px;
				}
			}
			.header-title {
				width: 100%;
				text-align: center;
				font-size: 18px;
				font-weight: 600;
			}
			.header-func {
				position: absolute;
				right: 0;
				top: 0;
				.icon {
					display: inline-block;
					height: 50px;
					line-height: 50px;
					padding: 0 8px;
					font-size: 18px;
				}		
			}
		}
		.msg-content {
			flex: 1;
			background-color: #eee;
			z-index: 900;
			.msg-item {
				display: flex;
				width: 100%;
				margin-top: 20px;
				.avatar {
					width: 50px;
					height: 50px;
					margin: 5px 12px;
					border-radius: 25px;
				}
				.con {
					width: 60%;
					margin-top: 5px;
					
				}
			}
		}
		.msg-footer {
			width: 100%;
			height: 80px;
			background-color: #eee;
			z-index: 1000;
			.footer-input {
				width: 100%;
				height: 40px;
				.input {
					width: 93%;
					height: 30px;
					line-height: 30px;
					border: none;
					border-radius: 5px;
					margin: 5px 0 0 3%;
					font-size: 14px;
					padding-left: 1%;
					outline: none;
					background-color: #fff;
				}
			}
			.footer-icon {
				width: 100%;
				height: 40px;
				line-height: 40px;
				font-size: 0;
				.icon-wrapper {
					display: flex;
					width: 94%;
					margin: 0 auto;
					justify-content: space-between;
					.icon {
						display: inline-block;
						height: 40px;
						line-height: 40px;
						font-size: 16px;
					}
				}
			}
		}
	}
</style>