<template>
	<div class="search">
		<div class="page-input">
			<div class="page-header">
				<div class="header-wrap">
					<input class="wrap-input" type="text">
					<div class="wrap-bg">
						<span class="icon icon-search"></span>
						<span id="font" class="font">搜索</span>
					</div>
					<div class="delete" @click="delInput(this)">x</div>
				</div>
				<div class="header-cancel" @click="pageShowF">取消</div>
			</div>
		</div>

		<div class="search-content">
			<div class="search-wrap">
				<div class="wrap-font"></div>
				<div class="wrap-icon"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		// props: {
		// 	searchShow: {
		// 		type: Boolean
		// 	}
		// },
		data() {
			return {}
		},
		mounted() {
			let input = document.querySelector('.wrap-input')
			let font = document.getElementById("font")
			let del = document.querySelector('.delete')
			input.focus()
			input.oninput = function() {
				if(this.value !== '') {
					font.innerText = ""
					del.style.display = "block"
				} else {
					font.innerText = "搜索"
					del.style.display = "none"
				}
			}
		},
		methods: {
			pageShowF: function() {
				this.$emit('searchShowF')
			},
			delInput: function(obj) {
				document.querySelector('.wrap-input').value = ""
				document.querySelector('.delete').style.display = "none"
				document.getElementById("font").innerText = "搜索"
			}
		}	
	}
</script>

<style lang="less">
	.search {	
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: #eee;
		z-index: 1200;
		.page-input {
			position: absolute;
			left: 0;
			top: 0;
			background-color: #eee;
			width: 100%;
			height: 100%;
			z-index: 1200;
			.page-header {
				display: flex;
				width: 100%;
				height: 40px;
				background-color: #fff;
				.header-wrap {
					position: relative;
					display: flex;
					flex: 1;
					overflow: hidden;
				}
				.header-cancel {
					height: 40px;
					line-height: 40px;
					padding: 0 10px;
					font-size: 14px;
				}
				.wrap-input {
					position: absolute;
					left: 28px;
					top: 8px;
					width: 85%;
					height: 22px;
					line-height: 22px;
					font-size: 12px;
					border: none;
					outline: none;
					background-color: transparent;
					z-index: 1202;
				}
				.wrap-bg {
					position: relative;
					flex: 1;
					line-height: 22px;
					color: #999;
					font-size: 0;
					margin: 8px 0 8px 8px;
					border-radius: 5px;
					z-index: 1201;
					background-color: #eee;
					.icon {
						display: inline-block;
						vertical-align: top;
						margin-top: 6px;
						width: 20px;
						text-align: center;
						font-size: 12px;
					}
					.font {
						display: inline-block;
						height: 24px;
						line-height: 24px;
						font-size: 12px;
					}
				}
				.delete {
					position: absolute;
					display: none;
					right: 8px;
					top: 14px;
					width: 12px;
					height: 12px;
					line-height: 12px;
					border-radius: 6px;
					text-align: center;
					font-size: 12px;
					background-color: #666;
					color: #fff;
					z-index: 1210;
				}
			}
		}
	}
</style>