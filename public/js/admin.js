
async function deleteCat(id) {
    // return console.log(id)
    //if(!)
    try {
        await fetch(`/admin/categories/delete/${id}`, {
            method: 'delete'
        })

        Swal.fire(
            'Good job!',
            'Category Deleted Successfully',
            'success'
        )

        next()
    } catch (e) {
        console.log(e.message)
    }
}

async function deleteSkill(id) {
    // return console.log(id)
    //if(!)
    try {
        await fetch(`/admin/skill-level/delete/${id}`, {
            method: 'delete'
        })

        Swal.fire(
            'Good job!',
            'Item Deleted Successfully',
            'success'
        )

        next()
    } catch (e) {
        console.log(e.message)
    }
}

async function deleteInterest(id) {
    // return console.log(id)
    //if(!)
    try {
        await fetch(`/admin/interest-area/delete/${id}`, {
            method: 'delete'
        })

        Swal.fire(
            'Good job!',
            'Item Deleted Successfully',
            'success'
        )

        next()
    } catch (e) {
        console.log(e.message)
    }
}

function notify() {
    Swal.fire(
        'Good job!',
        'Item Added Successfully',
        'success'
    )
}
