
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
# php接口代码
<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Test extends CI_Controller {

    public function index()
    {
        $page=$this->input->post('page',1);
        $limit=$this->input->post('limit',3);
        $products= $this->db->select('*')->from('a')->limit($limit,($page-1)*$limit)->order_by('id','desc')->get()->result_array();

        $num_arr = $this->db->select('count(*) as num')->from('a')->get()->row_array();
        $num=$num_arr["num"];

        json_output(200,array('products' => $products,"total"=>$num));

    }

    public function create()
    {
        $values= json_decode(file_get_contents('php://input'), TRUE);
        $this->db->insert('a',array("name"=>$values["name"],"price"=>$values["price"]));
        return array('status' => 201,'message' => 'Data has been created.');
    }

    public function one($id){
        $product = $this->db->from('a')->where("id",$id)->get()->row_array();
        json_output(200,array('product' => $product));
    }

    public function update($id)
    {
        $values= json_decode(file_get_contents('php://input'), TRUE);
        $this->db->where('id',$id)->update('a',$values);
        return array('status' => 201,'message' => 'Data has been update.');
    }

    public function delete($id){
        $this->db->where('id',$id)->delete('a');
        return array('status' => 200,'message' => 'Data has been deleted.');
    }


    //上传图片
    public function upload(){
        $path="../upload/file";
        //手动创建文件上传目录
        if (!is_dir($path)) {
            mkdir($path, 0777, true);
        }

        $config['upload_path'] =$path;//根目录下的uploads文件(即相对于入口文件)
        $config['allowed_types'] = 'gif|jpg|png';
        $config['max_size'] = '2048';//允许上传文件大小的最大值（以K为单位）。该参数为0则不限制。
        $config['max_width']  = '1024';
        $config['max_height']  = '768';
        $config['file_name']  = time();
        $this->load->library('upload', $config);
        $result = $this->upload->do_upload('file');

        if(!$result){
            $error = array('error' => $this->upload->display_errors());
            $error = strip_tags($error["error"]);
            json_output(201,array('status' => 201,'error' => $error));

        }else{
            $upload_data=$this->upload->data();
            $file_name=$upload_data["file_name"];
            json_output(200,array('status' => 200,'file_name' => "/upload/file/".$file_name));
        }
    }
}


# 数据库结构

CREATE TABLE `a` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL DEFAULT '',
  `price` decimal(11,2) NOT NULL DEFAULT '0.00',
  `onsale` tinyint(1) NOT NULL DEFAULT '1',
  `file` varchar(128) NOT NULL DEFAULT '',
  `content` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8