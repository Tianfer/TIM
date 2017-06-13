<template>
	<div class="myself">
		<div class="my-header">
			<div class="title">我</div>
			<div class="set">设置</div>
		</div>
		<div class="my-content">
			<div class="con-header" @click="pslShowF">
				<img class="avatar" src="/avatar/dog.png" alt="avatar">
				<span class="name">月光边境</span>
				<span class="username">123456789</span>
				<div class="icon-wrap">
					<span class="icon icon-qrcode"></span>
					<span class="icon icon-redo2"></span>
				</div>
			</div>
			<div class="divider"></div>

			<div class="item-wrap">
				<div class="item border-top">
					<div class="item-icon">
						<span class="icon-document"></span>
					</div>
					<div class="item-font">
						<div class="font">在线文档</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
				<div class="item">
					<div class="item-icon">
						<span class="icon-email"></span>
					</div>
					<div class="item-font">
						<div class="font">邮件</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
				<div class="item">
					<div class="item-icon">
						<span class="icon-collection"></span>
					</div>
					<div class="item-font">
						<div class="font">收藏</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
				<div class="item">
					<div class="item-icon">
						<span class="icon-date"></span>
					</div>
					<div class="item-font">
						<div class="font">日程</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
				<div class="item">
					<div class="item-icon">
						<span class="icon-phone"></span>
					</div>
					<div class="item-font">
						<div class="font">电话</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
				<div class="item border-bottom">
					<div class="item-icon">
						<span class="icon-file"></span>
					</div>
					<div class="item-font last">
						<div class="font">文件</div>
						<div class="icon-redo2"></div>
					</div>
				</div>
			</div>

			<div class="divider"></div>

			<div class="item border-top border-bottom">
				<div class="item-icon">
					<span class="icon-money"></span>
				</div>
				<div class="item-font last">
					<div class="font">钱包</div>
					<div class="icon-redo2"></div>
				</div>
			</div>

		</div>

		<transition name="psl">
			<pslInfo v-if="pslShow" :InforM="myself" @pslHideF="pslHideF"></pslInfo>
		</transition>
	</div>
</template>

<script>
	import axios from 'axios'
	import pslInfo from "@/components/pslInfo/pslInfo.vue"

	export default {
		data() {
			return {
				myself: '',
				pslShow: false
			}
		},
		created() {
			axios.get('/api/myself').then(res => {
				this.myself = res.data.data
				console.log(this.myself)
			})
		},
		methods: {
			pslShowF: function() {
				this.pslShow = !this.pslShow
			},
			pslHideF: function(data) {
				this.pslShow = data
			}
		},
		components: {
			pslInfo
		}
	}
</script>

<style lang="less">
	.icon-redo2 {
		color: #999;
	}
	.border-top {
		border-top: 1px solid #ccc;
	}
	.border-bottom {
		border-bottom: 1px solid #ccc;
	}

	.myself {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		.my-header {
			position: relative;
			width: 100%;
			height: 50px;
			line-height: 50px;
			color: #fff;
			background-color: #3385ff;
			text-align: center;
			.title {
				font-size: 18px;
				font-weight: 600;
			}
			.set {
				position: absolute;
				right: 10px;
				top: 0;
			}
		}
		.my-content {
			flex: 1;
			margin-bottom: 50px;
			overflow: auto;
			.con-header {
				position: relative;
				width: 100%;
				height: 100px;
				background-color: #fff;
				border-bottom: 1px solid #ccc;
				.avatar {
					position: absolute;
					top: 15px;
					left: 10px;
					width: 70px;
					height: 70px;
					border-radius: 35px;
				}
				.name {
					position: absolute;
					top: 20px;
					left: 90px;
					height: 30px;
					line-height: 30px;
				}
				.username {
					position: absolute;
					left: 90px;
					top: 50px;
					font-size: 14px;
					color: #999;
				}
				.icon-wrap {
					position: absolute;
					right: 0;
					top: 0;
					height: 100px;
					font-size: 0px;
					.icon {
						font-size: 16px;
						padding-right: 8px;
						height: 100px;
						line-height: 100px;
					}
				}
			}
			.divider {
				width: 100%;
				height: 15px;
				background-color: #eee;
			}
			.item-wrap {
				background-color: #fff;
			}
			.item {
				display: flex;
				width: 100%;
				height: 50px;
				line-height: 50px;
				background-color: #fff;
				.item-icon {
					width: 60px;
					line-height: 55px;
					text-align: center;
					font-size: 20px;
				}
				.item-font {
					position: relative;
					flex: 1;
					border-bottom: 1px solid #ccc;
					.icon-redo2 {
						position: absolute;
						right: 10px;
						top: 0;
						height: 50px;
						line-height: 50px; 
					}
				}
				.last {
					border-bottom: none;
				}
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