<template>
	<div class="header">
		<div class="header-item">
			<router-link to='/message'>1</router-link>
		</div>
		<div class="header-item">
			<router-link to='/relations'>2</router-link>
		</div>
		<div class="header-item">
			<router-link to='/myself'>3</router-link>
		</div>
	</div>
</template>

<script>
	
</script>

<style lang="less">
	.header {
		display: -webkit-flex;
		display: flex;
		position: absolute;
		top: 100%;
		left: 0;
		margin-top: -50px;
		width: 100%;
		height: 50px;
		line-height: 50px;
		border-top: 1px solid #ccc;
		.header-item {
			flex: 1;
		}
	}
</style>