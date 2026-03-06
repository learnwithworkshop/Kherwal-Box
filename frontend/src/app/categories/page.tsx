'use client';

import { useTranslation } from 'react-i18next';
import CategorySection from '@/components/video/CategorySection';
import { useState } from 'react';

export default function CategoriesPage() {
  const { t } = useTranslation('categories');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            {t('categories', 'Categories')}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            ᱥᱟᱱᱛᱟᱞ ᱥᱟᱦᱮᱫ ᱨᱤ ᱥᱩᱱᱫᱚᱨ ᱡᱤᱱᱤᱥ ᱠᱟᱦᱤ, ᱥᱮᱞᱮᱫ, ᱱᱟᱪᱚᱸ ᱟᱨ ᱦᱚᱸ ᱥᱟᱨ।
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategorySection view="featured" />
      </div>

      {/* Featured Category Content */}
      {selectedCategory && (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {t('recommended', 'Recommended For You')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for video cards */}
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"
              />
            ))}
          </div>
        </div>
      )}

      {/* Cultural Info Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 py-12 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🎭 Santhal Cultural Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Cultural Heritage
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Explore the rich cultural traditions of Santhal communities. From
                traditional folk songs to classical dance performances, discover
                the artistic expressions that define Santhal identity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Educational Content
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Learn about Santhal history, traditions, language, and customs.
                Our educational videos provide insights into the Santhal way of
                life and their significant contributions to society.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Contemporary News
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Stay updated with the latest news, events, and developments from
                Santhal communities. Coverage includes cultural events, social
                initiatives, and important announcements.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                Creative Expression
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Enjoy contemporary creative works by Santhal artists including
                music, visual arts, crafts, and storytelling that blend tradition
                with modern innovation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
