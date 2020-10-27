<template>
  <div class="nav-bar">
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
        @click="selectedMenu"
    >
      <a-sub-menu v-for="subMenu in MENUS" :key="subMenu.path">
        <template v-slot:title>
          <span><MailOutlined /><span>{{ subMenu.menuText }}</span></span>
        </template>
        <a-menu-item v-for="menuItem in subMenu.children" :key="menuItem.path">{{ menuItem.menuText }}</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template v-slot:title>
          <span><AppstoreOutlined /><span>Navigation Two</span></span>
        </template>
        <a-menu-item key="9">Option 9</a-menu-item>
        <a-menu-item key="10">Option 10</a-menu-item>
        <a-sub-menu key="sub3" title="Submenu">
          <a-menu-item key="11">
            Option 11
          </a-menu-item>
          <a-menu-item key="12">
            Option 12
          </a-menu-item>
        </a-sub-menu>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
  import { MENUS } from '../../router/routes'
  import {
    MailOutlined,
    AppstoreOutlined
  } from '@ant-design/icons-vue'

  export default {
    name: 'NavBar',
    components: {
      MailOutlined,
      AppstoreOutlined
    },
    data() {
      return {
        MENUS,
        collapsed: false,
        selectedKeys: ['1'],
        openKeys: ['sub1'],
        preOpenKeys: ['sub1']
      }
    },
    watch: {
      openKeys(val, oldVal) {
        this.preOpenKeys = oldVal;
      },
    },
    methods: {
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
        this.openKeys = this.collapsed ? [] : this.preOpenKeys;
      },
      selectedMenu(menuItem) {
        this.$router.push(menuItem.key)
      }
    }
  }
</script>

<style scoped>

</style>
