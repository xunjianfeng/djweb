//import checkPermission from '@/utils/permission'
export default {
    name: 'Listing',
    data() {
        return {
            list: null,
            total_count: null,
            listLoading: true,
            listQuery: {
                page: 1,
                size: 10
            },
			listQuery2: {
			    page: 1,
			    size: 10
			}
        }
    },
    watch: {
        $route: {
            handler(to, from) {
                if (this.$options.name === to.name) {
                    this.getList();
					this.get_myCoupon()
                }
            },
            deep: true
        }
    },
    mounted() {
        this.getList()
		this.get_myCoupon()
    },
    methods: {
        handlePageChange(value) {
            console.log(value)
            const { page, limit } = value;
            this.listQuery.page = page;
            this.listQuery.size = limit;
			this.listQuery2.page = page;
			this.listQuery2.size = limit;
            this.getList()
			this.get_myCoupon()
        }
    }
}