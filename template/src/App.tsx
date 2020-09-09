import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MenuItemGroup, SubMenu } from '@muya-ui/core';
import { UserIcon, SetIcon, TagIcon, PicIcon } from '@muya-ui/theme-light';
import { Content, Sider, Layout, Link } from './layout';
import loadable from '@loadable/component';
import Header from '@/components/Header';

const basename = '/';

const BrandgoodDetail = loadable(() => import('./pages/BrandgoodDetail'));
const DesignDetail = loadable(() => import('./pages/DesignDetail'));
const BrandgoodList = loadable(() => import('./pages/BrandgoodList'));
const ModelList = loadable(() => import('./pages/ModelList'));
const ModelAuth = loadable(() => import('./pages/ModelAuth'));

export default function App() {
    return (
        <BrowserRouter basename={basename}>
            <Header />
            <Layout>
                <Sider
                    menuTitle="企业管理"
                    collapsedMenuTitle="企"
                    defaultOpenKeys={['model']}
                >
                    <MenuItemGroup key="brandgoods" title="商品管理">
                        <Link
                            to="/brandgood/detail"
                            key="/detail/brandgood"
                            icon={<SetIcon />}
                        >
                            商品详情
                        </Link>
                        <Link
                            to="/brandgood/design"
                            key="/brandgood/design"
                            icon={<PicIcon />}
                        >
                            方案详情
                        </Link>
                        <Link
                            to="/brandgood/list"
                            key="/brandgood/list"
                            icon={<UserIcon />}
                        >
                            商品列表
                        </Link>
                        <SubMenu title="模型管理" key="model" icon={<TagIcon />}>
                            <Link key="/model/manage" to="/model/manage">
                                款式详情
                            </Link>
                            <Link key="/model/auth" to="/model/auth">
                                模型授权
                            </Link>
                        </SubMenu>
                    </MenuItemGroup>
                </Sider>
                <Content>
                    <Switch>
                        <Route path="/brandgood/detail" exact component={BrandgoodDetail} />
                        <Route path="/brandgood/design" exact component={DesignDetail} />
                        <Route path="/brandgood/list" exact component={BrandgoodList} />
                        <Route path="/model/manage" exact component={ModelList} />
                        <Route path="/model/auth" exact component={ModelAuth} />
                        <Redirect exact from="/" to="/brandgood/detail" />
                    </Switch>
                </Content>
            </Layout>
        </BrowserRouter>
    );
}
