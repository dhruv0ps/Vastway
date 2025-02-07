import { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'flowbite-react';
import { toast } from 'react-toastify';
import { drawrAPi } from '../../config/apiRoutes/drawroutes';
import showConfirmationModal from '../../util/Confirmation';
import { Category, subCategory } from "../../config/models/category"
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

const CategoryManager: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [deletedCategories, setDeletedCategories] = useState<Category[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
    const [showSubcategoryFormModal, setShowSubcategoryFormModal] = useState(false);
    const [currentCategoryForSubcategories, setCurrentCategoryForSubcategories] = useState<Category | null>(null);
    const [subcategories, setSubcategories] = useState<subCategory[]>([]);
    const [currentSubcategory, setCurrentSubcategory] = useState<subCategory | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        singleDigitKey: 0,
        status: 'ACTIVE'
    });

    const [subcategoryFormData, setSubcategoryFormData] = useState({
        name: '',
        ID: '',
        status: 'ACTIVE'
    });

    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await drawrAPi.GetCategories();
            if (res.status) {
                setCategories(res.data);
                setDeletedCategories(res.data.filter((cat: Category) => cat.status === 'DELETED'));
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            toast.error('Failed to fetch categories');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSubmit = async () => {
        const categoryData = {
            name: formData.name,
            singleDigitKey: formData.singleDigitKey,
        };
    
        try {
            let res;
            if (currentCategory) {
                // Update existing category
                res = await drawrAPi.UpdateCategories(currentCategory._id ?? '', categoryData);
            } else {
                // Add new category
                res = await drawrAPi.AddCategory(categoryData);
            }
    
            if (res.status) {
                toast.success(`Category successfully ${currentCategory ? 'updated' : 'added'}.`);
            }
    
            setShowModal(false);
            fetchCategories();
        } catch (error) {
            console.error('Error handling category:', error);
            toast.error('Failed to handle category');
        }
    };
    

    const handleSubcategorySubmit = async () => {
        if (!currentCategoryForSubcategories?._id) return;

        try {
            if (currentSubcategory) {
                const res = await drawrAPi.UpdatesubCategories(currentSubcategory._id ?? '', subcategoryFormData);
                if (res.status) {
                    toast.success('Subcategory successfully updated.');
                    await fetchSubcategories(currentCategoryForSubcategories._id);
                }
            } else {
                const res = await drawrAPi.AddsubCategory(currentCategoryForSubcategories._id, subcategoryFormData);
                if (res.status) {
                    toast.success('Subcategory successfully added.');
                    await fetchSubcategories(currentCategoryForSubcategories._id);
                }
            }
            setShowSubcategoryFormModal(false);
            resetSubcategoryForm();
        } catch (error) {
            console.error('Error handling subcategory:', error);
            toast.error('Failed to handle subcategory');
        }
    };

    const fetchSubcategories = async (categoryId: string) => {
        try {
            const res = await drawrAPi.GetsubCategories(categoryId);
            if (res.status) {
                setSubcategories(res.data);
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            toast.error('Failed to fetch subcategories');
        }
    };

    const handleDelete = async (category: Category) => {
        const confirmed = await showConfirmationModal('Are you sure you want to delete this category?');
        if (!confirmed) return;

        try {
            const res = await drawrAPi.UpdateCategories(category._id ?? '', { ...category, status: 'DELETED' });
            if (res.status) {
                toast.success('Category successfully deleted.');
                fetchCategories();
            }
        } catch (error) {
            console.error('Error deleting category:', error);
            toast.error('Failed to delete category');
        }
    };

    const handleDeleteSubcategory = async (subcategory: subCategory) => {
        const confirmed = await showConfirmationModal(`Are you sure you want to ${subcategory.status === "DELETED" ? "restore" : "delete"} this subcategory?`);
        if (!confirmed) return;

        try {
            let new_status = subcategory.status === "DELETED" ? "ACTIVE" : "DELETED"
            const res = await drawrAPi.UpdatesubCategories(subcategory._id ?? '', { ...subcategory, status: new_status });
            if (res.status) {
                toast.success('Subcategory successfully deleted.');
                if (currentCategoryForSubcategories?._id) {
                    await fetchSubcategories(currentCategoryForSubcategories._id);
                }
            }
        } catch (error) {
            console.error('Error deleting subcategory:', error);
            toast.error('Failed to delete subcategory');
        }
    };

    const handleRestore = async (category: Category) => {
        const confirmed = await showConfirmationModal('Are you sure you want to restore this category?');
        if (!confirmed) return;

        try {
            const res = await drawrAPi.UpdateCategories(category._id ?? '', { ...category, status: 'ACTIVE' });
            if (res.status) {
                toast.success('Category successfully restored.');
                fetchCategories();
            }
        } catch (error) {
            console.error('Error restoring category:', error);
            toast.error('Failed to restore category');
        }
    };

    const openModalForEdit = (category: Category) => {
        setCurrentCategory(category);
        setFormData({
            name: category.name,
            status: category.status,
            singleDigitKey: category.singleDigitKey,
        });
        setShowModal(true);
    };

    const openSubcategoryModalForEdit = (subcategory: subCategory) => {
        setCurrentSubcategory(subcategory);
        setSubcategoryFormData({
            name: subcategory.name,
            status: subcategory.status,
            ID: subcategory.ID
        });
        setShowSubcategoryFormModal(true);
    };

    const openModalForAdd = () => {
        setCurrentCategory(null);
        setFormData({
            name: '',
            status: 'ACTIVE',
            singleDigitKey: 0
        });
        setShowModal(true);
    };

    const openSubcategoryModalForAdd = () => {
        setCurrentSubcategory(null);
        resetSubcategoryForm();
        setShowSubcategoryFormModal(true);
    };

    const resetSubcategoryForm = () => {
        setSubcategoryFormData({
            name: '',
            status: 'ACTIVE',
            ID: ''
        });
    };

   

    const openSubcategoryModal = async (category: Category) => {
        setCurrentCategoryForSubcategories(category);
        await fetchSubcategories(category._id ?? '');
        setShowSubcategoryModal(true);
    };

    const closeSubcategoryModal = () => {
        setShowSubcategoryModal(false);
        setSubcategories([]);
        setCurrentCategoryForSubcategories(null);
    };

    const toTitleCase = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

   

    return (
        <div className="max-w-7xl mx-auto p-5 rounded-lg bg-white">
            <div className='mb-12 flex items-center justify-between'>
                <Button color='gray' onClick={() => navigate(-1)}>
                    <span className='flex gap-2 items-center'><FaChevronLeft />Back</span>
                </Button>
                <h2 className="text-2xl font-semibold">Manage Categories</h2>
                <Button color="green" onClick={openModalForAdd}>Add New Category</Button>
            </div>

            {/* Active Categories Table */}
            <div className="mt-5">
                <h3 className="font-bold mb-2">Active Categories</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell className='justify-end flex'>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {categories.map((category) => (
                                <Table.Row key={category._id}>
                                    <Table.Cell>{toTitleCase(category.name)}</Table.Cell>
                                    <Table.Cell className='flex gap-x-3 space-x-4 items-center justify-end'>
                                        <Button size={'sm'} color="info" onClick={() => openSubcategoryModal(category)}>
                                            Manage Subcategories
                                        </Button>
                                        <Button size={'sm'} color="warning" onClick={() => openModalForEdit(category)}>
                                            Edit
                                        </Button>
                                        <Button size={'sm'} color="failure" onClick={() => handleDelete(category)}>
                                            Delete
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>

            {/* Deleted Categories Table */}
            <div className="mt-5">
                <h3 className="font-bold mb-2">Deleted Categories</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Image</Table.HeadCell>
                            <Table.HeadCell className='justify-end flex'>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {deletedCategories.map((category) => (
                                <Table.Row key={category._id}>
                                    <Table.Cell>{toTitleCase(category.name)}</Table.Cell>
                                   
                                    <Table.Cell className='justify-end flex'>
                                        <Button size={'xs'} color="success" onClick={() => handleRestore(category)}>
                                            Restore
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </div>
            </div>
            {/* Category Form Modal */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>{currentCategory ? 'Edit Category' : 'Add Category'}</Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                        <div className="flex mb-4 gap-x-5">

                            <div className="flex-grow">
                                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                                    Category Name:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="">
                                <label htmlFor="singleDigitKey" className="block text-gray-700 font-semibold mb-1">
                                    Single Digit Key:
                                </label>
                                <select
                                    disabled={currentCategory !== null}
                                    id="singleDigitKey"
                                    value={formData.singleDigitKey}
                                    onChange={(e) => setFormData({ ...formData, singleDigitKey: Number(e.target.value) })}
                                    required
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                >
                                    <option value="">Select a digit</option>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((digit) => (
                                        <option key={digit} value={digit}>
                                            {digit}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <Button type="submit" color="green">
                            {currentCategory ? 'Update' : 'Add'} Category
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Image Preview Modal */}
            

            {/* Subcategories List Modal */}
            <Modal
                show={showSubcategoryModal}
                onClose={closeSubcategoryModal}
                size="xl"
            >
                <Modal.Header>
                    Manage Subcategories for {currentCategoryForSubcategories?.name}
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-4">
                        <Button
                            color="green"
                            onClick={openSubcategoryModalForAdd}
                        >
                            Add New Subcategory
                        </Button>
                    </div>
                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>Name</Table.HeadCell>
                                <Table.HeadCell>ID</Table.HeadCell>
                                <Table.HeadCell>Status</Table.HeadCell>
                                <Table.HeadCell className='justify-end flex'>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Body>
                                {subcategories.map((subcategory) => (
                                    <Table.Row key={subcategory._id}>
                                        <Table.Cell>{toTitleCase(subcategory.name)}</Table.Cell>
                                        <Table.Cell>{subcategory.ID}</Table.Cell>
                                        <Table.Cell>{subcategory.status}</Table.Cell>
                                        <Table.Cell className='flex gap-x-3 items-center justify-end'>
                                            <Button
                                                size={'sm'}
                                                color="warning"
                                                onClick={() => openSubcategoryModalForEdit(subcategory)}
                                            >
                                                Edit
                                            </Button>
                                            {subcategory.status === "DELETED" ? <Button
                                                size={'sm'}
                                                color="success"
                                                onClick={() => handleDeleteSubcategory(subcategory)}
                                            >
                                                Restore
                                            </Button> : <Button
                                                size={'sm'}
                                                color="failure"
                                                onClick={() => handleDeleteSubcategory(subcategory)}
                                            >
                                                Delete
                                            </Button>}
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>
                </Modal.Body>
            </Modal>

            {/* Subcategory Form Modal */}
            <Modal
                show={showSubcategoryFormModal}
                onClose={() => setShowSubcategoryFormModal(false)}
            >
                <Modal.Header>
                    {currentSubcategory ? 'Edit Subcategory' : 'Add Subcategory'}
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={(e) => { e.preventDefault(); handleSubcategorySubmit(); }}>
                        <div className="flex mb-4 gap-x-5">
                            <div className="w-20">
                                <label htmlFor="name" className="block text-gray-700 font-semibold mb-1">
                                    ID:
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={subcategoryFormData.ID}
                                    onChange={(e) => {
                                        let value = e.target.value?.trim()?.toUpperCase();
                                        if (value.length > 2 && !/[/-]/.test(value)) {
                                            value = value.slice(0, 2);
                                        } else if (value.length > 3) {
                                            value = value.slice(0, 3);
                                        }
                                        setSubcategoryFormData({ ...subcategoryFormData, ID: value });
                                    }}
                                    required
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="subcategoryName" className="block text-gray-700 font-semibold mb-1">
                                    Subcategory Name:
                                </label>
                                <input
                                    type="text"
                                    id="subcategoryName"
                                    value={subcategoryFormData.name}
                                    onChange={(e) => setSubcategoryFormData({
                                        ...subcategoryFormData,
                                        name: e.target.value
                                    })}
                                    required
                                    className="border border-gray-300 rounded-lg p-2 w-full"
                                />

                            </div>
                        </div>

                        <Button type="submit" color="green">
                            {currentSubcategory ? 'Update' : 'Add'} Subcategory
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoryManager;
