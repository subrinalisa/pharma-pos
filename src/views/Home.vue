<script setup>
import MainLayout from "@/components/MainLayout.vue";
import { PictureOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <MainLayout>
    <div class="grid grid-cols-3 gap-4">
      <div class="col-span-2">
        <!-- Search -->
        <form class="flex mb-4" @submit.prevent="console.log('hello')">
          <button
            type="submit"
            class="border border-slate-300 px-5 py-2 shadow-inner"
          >
            <i class="bi bi-search"></i>
          </button>
          <a-dropdown :trigger="['click']">
            <input
              type="text"
              placeholder="Enter item name or scan barcode"
              class="bg-white w-full px-3 py-3 outline-none shadow-inner border border-slate-300 text-black"
            />
            <template #overlay>
              <a-menu class="max-h-80 overflow-y-auto">
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!-- a-menu-item -->
                <a-menu-item>
                  <div class="flex">
                    <div class="mr-3">
                      <a-avatar :size="32">
                        <PictureOutlined class="align-middle mb-2" />
                      </a-avatar>
                    </div>
                    <div>
                      <h6 class="font-bold">
                        Lorem ipsum dolor sit amet consectetur.
                      </h6>
                      <p class="text-gray-500">
                        Item: lorem 200ml; Size: 30gm; Category:
                        <span class="text-green-600">oral</span>; Qty:
                        <span class="text-green-600">2</span>
                      </p>
                    </div>
                  </div>
                </a-menu-item>
                <!--/ a-menu-item -->
              </a-menu>
            </template>
          </a-dropdown>

          <button
            class="bg-[#000180] px-5 py-1 text-white min-w-fit"
            type="button"
          >
            <i class="bi bi-cart mr-2"></i> <span>Purchased</span>
          </button>
        </form>
        <!-- Table -->
        <table class="table border-collapse border border-slate-400 w-full">
          <thead>
            <tr>
              <th>-</th>
              <th class="text-center">SL</th>
              <th class="text-left">Item Name</th>
              <th class="text-right">Pack Size</th>
              <th class="text-right">TP</th>
              <th class="text-right">VAT</th>
              <th class="text-right">Cost</th>
              <th class="text-right">Qty.</th>
              <th class="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">
                <button type="button" class="w-full">
                  <i class="bi bi-x-lg text-red-500"></i>
                </button>
              </td>
              <td class="text-center">1</td>
              <td>Discount (Dis)</td>
              <td class="text-right">Pack (510)</td>
              <td class="text-right">459.00</td>
              <td class="text-right">459.00</td>
              <td class="text-right">459.00</td>
              <td class="text-right">1</td>
              <td class="text-right">1000</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-side">
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2"
              >
                ...
              </button>
            </li>
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2"
              >
                <i class="bi bi-x-lg mr-3 text-red-600"></i>Cancel Recv.
              </button>
            </li>
          </ul>
          <!-- Pharma -->
          <div class="flex justify-between">
            <div class="mb-4">
              <div class="flex">
                <div class="mr-3">
                  <img src="@/assets/images/user.png" alt="" />
                </div>
                <div>
                  <h6 class="font-bold">Beximco Pharmaceuticals Ltd.</h6>
                  <p class="text-[#43B000]">(0.00)</p>
                </div>
              </div>
            </div>
            <div>
              <button type="button" class="text-blue-600">
                <i class="bi bi-pencil-square"></i>
              </button>
            </div>
          </div>
          <!-- Update & detach -->
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <button type="button" class="w-full text-left">
                <i class="bi bi-check2-circle mr-3"></i>Update Supplier
              </button>
            </li>
            <li class="mb-4 w-1/2">
              <button type="button" class="w-full text-right">
                <i class="bi bi-x mr-3 text-red-600"></i>Detach
              </button>
            </li>
          </ul>
        </div>
        <!-- Getis -->
        <div class="border border-slate-300 p-2 px-3 mb-4">
          <h6 class="font-bold mb-3">
            <i class="bi bi-percent mr-3 text-red-600"></i>Getis
          </h6>
          <ul class="flex items-center space-x-4 list-none p-0 w-full">
            <li class="mb-4 w-1/2">
              <button
                type="button"
                class="shadow-inner border border-slate-400 w-full py-2 text-left px-2"
              >
                Getis Percent
              </button>
            </li>
            <li class="mb-4 w-1/2">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="200"
              />
            </li>
          </ul>
        </div>
        <!-- Total -->
        <div class="border border-slate-300 p-2 px-3">
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Discount Entire Receivings:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Sub Total:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total Trade Price:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 font-bold"
                value="00"
              />
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div class="mb-3"><label>Total VAT:</label></div>
            <div class="mb-3">
              <input
                type="number"
                class="shadow-inner bg-transparent text-right px-2 border border-slate-400 w-full py-2 text-red-600"
                value="00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>
