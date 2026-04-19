<?php $__env->startSection('title', 'Home'); ?>

<?php $__env->startSection('content'); ?>
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Main content -->
        <div class="lg:col-span-2">
            <?php $__currentLoopData = $posts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div class="flex flex-col md:flex-row gap-6">
                        <?php if($post->cover_image): ?>
                            <div class="md:w-1/3">
                                <img src="<?php echo e(asset('storage/' . $post->cover_image)); ?>" alt="<?php echo e($post->title); ?>" class="w-full h-40 object-cover rounded-lg">
                            </div>
                            <div class="md:w-2/3">
                        <?php else: ?>
                            <div class="w-full">
                        <?php endif; ?>
                            <div class="flex items-center text-sm text-gray-500 mb-2">
                                <span><?php echo e($post->category?->name); ?></span>
                                <span class="mx-2">•</span>
                                <span><?php echo e($post->published_at->format('M d, Y')); ?></span>
                                <span class="mx-2">•</span>
                                <span><?php echo e($post->user->name); ?></span>
                            </div>
                            <h2 class="text-2xl font-bold mb-2">
                                <a href="<?php echo e(route('post.show', $post)); ?>" class="text-gray-800 hover:text-blue-600">
                                    <?php echo e($post->title); ?>

                                </a>
                            </h2>
                            <p class="text-gray-600 mb-4">
                                <?php echo e($post->excerpt ?: Str::limit($post->content, 150)); ?>

                            </p>
                            <div class="flex items-center justify-between">
                                <div class="flex space-x-2">
                                    <?php $__currentLoopData = $post->tags; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                        <a href="<?php echo e(route('post.byTag', $tag)); ?>" class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800">
                                            <?php echo e($tag->name); ?>

                                        </a>
                                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                </div>
                                <div class="flex items-center text-gray-500">
                                    <i class="fa fa-eye mr-1"></i>
                                    <span><?php echo e($post->views); ?></span>
                                    <i class="fa fa-comment ml-4 mr-1"></i>
                                    <span><?php echo e($post->comments->count()); ?></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            
            <!-- Pagination -->
            <div class="mt-8">
                <?php echo e($posts->links()); ?>

            </div>
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
            <!-- Search -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Search</h3>
                <form action="<?php echo e(route('post.search')); ?>" method="GET">
                    <div class="flex">
                        <input type="text" name="q" placeholder="Search posts..." class="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700">
                            <i class="fa fa-search"></i>
                        </button>
                    </div>
                </form>
            </div>
            
            <!-- Categories -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Categories</h3>
                <ul class="space-y-2">
                    <?php $__currentLoopData = $categories; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $category): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li>
                            <a href="<?php echo e(route('post.byCategory', $category)); ?>" class="flex justify-between text-gray-700 hover:text-blue-600">
                                <?php echo e($category->name); ?>

                                <span class="text-gray-500">(<?php echo e($category->posts->count()); ?>)</span>
                            </a>
                        </li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
            
            <!-- Tags -->
            <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 class="text-lg font-bold mb-4">Tags</h3>
                <div class="flex flex-wrap gap-2">
                    <?php $__currentLoopData = $tags; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $tag): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <a href="<?php echo e(route('post.byTag', $tag)); ?>" class="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-800">
                            <?php echo e($tag->name); ?>

                        </a>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </div>
            </div>
            
            <!-- Latest posts -->
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-lg font-bold mb-4">Latest Posts</h3>
                <ul class="space-y-4">
                    <?php $__currentLoopData = $latestPosts; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $post): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <li>
                            <a href="<?php echo e(route('post.show', $post)); ?>" class="text-gray-700 hover:text-blue-600">
                                <?php echo e($post->title); ?>

                            </a>
                            <p class="text-sm text-gray-500">
                                <?php echo e($post->published_at->format('M d, Y')); ?>

                            </p>
                        </li>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                </ul>
            </div>
        </div>
    </div>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /workspace/trblog-php/resources/views/home.blade.php ENDPATH**/ ?>