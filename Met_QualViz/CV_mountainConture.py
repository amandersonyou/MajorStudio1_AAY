import cv2
import numpy as np
import matplotlib.pyplot as plt

img = cv2.imread('testYosemite.jpg', 0)

lap = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
lap = np.uint8(np.absolute(lap))
sobelX = cv2.Sobel(img, cv2.CV_64F, 1, 0)
sobelY = cv2.Sobel(img, cv2.CV_64F, 0, 1)
sobelX = np.uint8(np.absolute(sobelX))
sobelY = np.uint8(np.absolute(sobelY))
sobelCombined = cv2.bitwise_or(sobelX, sobelY)
edges = cv2.Canny(img, 100, 200)

titles = ['image', 'Laplacian', 'sobelX', 'sobelY', 'sobelCombined', 'Canny']
images = [img, lap, sobelX, sobelY, sobelCombined, edges]
for i in range(6):
    plt.subplot(2, 3, i+1), plt.imshow(images[i], 'gray')
    plt.title(titles[i])
    plt.xticks([]), plt.yticks([])

plt.show()


# _______________________________________
img = cv2.imread('testYosemite.jpg')
imgray = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
ret, thresh = cv2.threshold(imgray, 127, 255, 0)
contours, hierarchy = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)
print("number of contours =  " + str(len(contours)))

# print(contours)

cv2.drawContours(img, contours, -1, (0, 255, 0), 3)

cv2.imshow('Image', img)
cv2.imshow('Image GRAY', imgray)
cv2.waitKey(0)
cv2.destroyAllWindows()
# _______________________________________




# cv2.imshow('image', img)
# k = cv2.waitKey(0)

# set conditions to either escape window with esc (27) key, or save image with 's' key
# if k == 27:
#     cv2.destroyAllWindows()
# elif k == ord('s'):
#     cv2.imwrite('test_copy.png', img)
#     cv2.destroyAllWindows()

# To plot the image
# img = cv2.imread('testYosemite.jpg')
# plt.imshow(img)
# plt.imshow(img, cmap = 'gray', interpolation = 'bicubic')
# plt.xticks([]), plt.yticks([])  # to hide tick values on X and Y axis
# plt.show()




# Laplacian gradient:
# lap = cv2.Laplacian(img, cv2.CV_64F, ksize=3)
# lap = np.uint8(np.absolute(lap))
#
# titles = ['image', 'Laplacian']
# images = [img, lap]
# for i in range(2):
#     plt.subplot(1, 2, i+1), plt.imshow(images[i], 'gray')
#     plt.title(titles[i])
#     plt.xticks([]), plt.yticks([])
#
# plt.show()