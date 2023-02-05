import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post('/create')
  async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const createdProduct = await this.productService.createProduct(
      createProductDTO,
    );
    return res
      .status(HttpStatus.OK)
      .send({ message: 'Product created', product: createdProduct });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({
      message: 'Products listed',
      products,
    });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);

    if (!product) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json(product);
  }

  //Delete product by @Param
  @Delete('/delete/:productID')
  async deleteProductByParam(@Res() res, @Param('productID') productID) {
    const deletedProduct = await this.productService.deleteProduct(productID);

    if (!deletedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted',
      product: deletedProduct.name,
    });
  }

  //Delete product by @Query
  @Delete('/delete')
  async deleteProductByQuery(@Res() res, @Query('productID') productID) {
    const deletedProduct = await this.productService.deleteProduct(productID);

    if (!deletedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted',
      product: deletedProduct.name,
    });
  }

  //Update product by @Param
  @Put('/update/:productID')
  async updateProductByParam(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );

    if (!updatedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated',
      product: updatedProduct,
    });
  }

  //Update product by @Query
  @Put('/update')
  async updateProductByQuery(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Query('productID') productID,
  ) {
    const updatedProduct = await this.productService.updateProduct(
      productID,
      createProductDTO,
    );

    if (!updatedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated',
      product: updatedProduct,
    });
  }
}
