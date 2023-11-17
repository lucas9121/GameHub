
export default function sort(arr, acc = 'none', option='none') {
    if(acc === 'none') return arr
    if(acc === 'admin'){
        return arr.sort((a, b) => {
            if(b.approved === 'review'){
                return -1
            }
            return 0
        }).reverse()
    }
    if(acc === 'developer'){
        return arr.sort((a, b) => {
            if(b.approved === 'no'){
                return -1
            }
            return 0
        }).reverse()
    }
    if(acc === 'gamer'){
        if(option === 'name up'){
            return arr.sort((a, b) => {

                if(a.name.toUpperCase() > b.name.toUpperCase()){
                    return 1
                }
                if(a.name.toUpperCase() < b.name.toUpperCase()){
                    return -1
                }
                return 0
            })
        }
        if(option === 'name down') {
            return arr.sort((a, b) => {

                if(a.name.toUpperCase() < b.name.toUpperCase()){
                    return 1
                }
                if(a.name.toUpperCase() > b.name.toUpperCase()){
                    return -1
                }
                return 0
            })
        }
        if(option === 'price up') return arr.sort((a, b) => a.price - b.price)
        if(option === 'price down') return arr.sort((a, b) => b.price - a.price)
        if(option === 'most sold'){
            return arr.sort((a, b) => {

                if(a.sold > b.sold){
                    return -1
                }
                if(a.sold < b.sold){
                    return 1
                }
                return 0
            })
        }
        if(option === 'newest'){
            return arr.sort((a, b) => {
                if(a.createdAt > b.createdAt){
                    return 1
                }
                if(a.createdAt < b.createdAt){
                    return -1
                }
                return 0
            })
        }
        if(option === 'updated'){
            return arr.sort((a, b) => {
                if(a.updatedAt > b.updatedAt){
                    return 1
                }
                if(a.updatedAt < b.updatedAt){
                    return -1
                }
                return 0
            })
        }
        return arr
    }
}