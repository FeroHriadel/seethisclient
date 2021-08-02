import Heading from "../../components/Heading";
import Bricks from "../../components/Bricks";
import Switch from "../../components/Switch";
import Menu from "../../components/Menu";
import TagCreateForm from "../../components/TagCreateForm";
import ProtectAdminRoute from '../../components/ProtectAdminRoute';



export default function Categorycreate() {

    //RENDER
    return (
        <ProtectAdminRoute>
            <div className='tag-create-page'>
                <Bricks />
                <Switch />
                <Menu />

                <div className='container'>
                    <Heading>
                        Admin - <span>Create Tag</span>
                    </Heading>

                    <TagCreateForm />
                </div>
            </div>
        </ProtectAdminRoute>
    )
}
