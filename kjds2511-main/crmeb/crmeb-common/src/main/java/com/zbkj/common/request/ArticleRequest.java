package com.zbkj.common.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;

/**
 * 文章管理 Request
 *  +----------------------------------------------------------------------
 *  | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
 *  +----------------------------------------------------------------------
 *  | Copyright (c) 2016~2025 https://www.crmeb.com All rights reserved.
 *  +----------------------------------------------------------------------
 *  | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
 *  +----------------------------------------------------------------------
 *  | Author: CRMEB Team <admin@crmeb.com>
 *  +----------------------------------------------------------------------
 */
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@ApiModel(value="ArticleRequest对象", description="文章管理表")
public class ArticleRequest implements Serializable {

    private static final long serialVersionUID=1L;

    @ApiModelProperty(value = "分类id", required = true)
    @NotBlank(message = "请选择分类")
    private String cid;

    @ApiModelProperty(value = "文章标题", required = true)
    @NotBlank(message = "请填写文章标题")
    @Size(max = 200, message = "文章标题最多200个字符")
    private String title;

    @ApiModelProperty(value = "文章作者", required = true)
    @NotBlank(message = "请填写文章作者")
    @Size(max = 50, message = "文章作者最多50个字符")
    private String author;

    @ApiModelProperty(value = "文章图片", required = true)
    @NotBlank(message = "请上传文章图片")
    @Size(max = 255, message = "文章图片名称最多255个字符")
    private String imageInput;

    @ApiModelProperty(value = "文章简介", required = true)
    @Size(max = 200, message = "文章简介最多200个字符")
    @NotBlank(message = "请填写文章简介")
    private String synopsis;

    @ApiModelProperty(value = "文章分享标题", required = true)
    @NotBlank(message = "请填写文章分享标题")
    @Size(max = 200, message = "文章分享标题最多200个字符")
    private String shareTitle;

    @ApiModelProperty(value = "文章分享简介", required = true)
    @NotBlank(message = "请填写文章分享简介")
    @Size(max = 200, message = "文章分享简介最多200个字符")
    private String shareSynopsis;

    @ApiModelProperty(value = "是否热门(小程序)", example = "false")
    @NotNull(message = "是否热门(小程序)不能为空")
    private Boolean isHot;

    @ApiModelProperty(value = "是否轮播图(小程序)" , example = "true")
    @NotNull(message = "是否轮播图(小程序)不能为空")
    private Boolean isBanner;

    @ApiModelProperty(value = "文章内容", required = true)
    @NotBlank(message = "请填写文章内容")
    private String content;
}
