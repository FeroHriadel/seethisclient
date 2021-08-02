import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import CategoryCreateForm from "../../components/CategoryCreateForm";
import ProtectAdminRoute from '../../components/ProtectAdminRoute';



export default function Categorycreate() {

    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='category-create-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span>Create Category</span>
                    </Heading>

                    <CategoryCreateForm />
                </div>
            </div>
        </ProtectAdminRoute>
    )
}
