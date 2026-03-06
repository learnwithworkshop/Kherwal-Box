from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from app.services.category_service import CategoryService
from app.schemas.category import (
    CategoryCreate,
    CategoryUpdate,
    CategoryResponse,
    CategoryDetailResponse,
)
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/categories", tags=["categories"])


@router.get("", response_model=dict)
async def get_categories(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    language: str = Query('en'),
    db: Session = Depends(get_db),
):
    """Get all content categories"""
    try:
        categories, total = CategoryService.get_all_categories(
            db=db,
            language=language,
            skip=skip,
            limit=limit,
            active_only=True
        )
        
        return {
            "items": [
                {
                    **category.__dict__,
                    "created_at": category.created_at.isoformat() if category.created_at else None,
                    "updated_at": category.updated_at.isoformat() if category.updated_at else None,
                }
                for category in categories
            ],
            "total": total,
            "skip": skip,
            "limit": limit,
        }
    except Exception as e:
        logger.error(f"Error fetching categories: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching categories")


@router.get("/{category_id}", response_model=dict)
async def get_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    """Get category by ID with video count"""
    try:
        result = CategoryService.get_category_with_video_count(db, category_id)
        
        if not result:
            raise HTTPException(status_code=404, detail="Category not found")
        
        category = result['category']
        video_count = result['video_count']
        
        return {
            **category.__dict__,
            "video_count": video_count,
            "created_at": category.created_at.isoformat() if category.created_at else None,
            "updated_at": category.updated_at.isoformat() if category.updated_at else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching category {category_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching category")


@router.get("/slug/{slug}", response_model=dict)
async def get_category_by_slug(
    slug: str,
    db: Session = Depends(get_db),
):
    """Get category by slug"""
    try:
        category = CategoryService.get_category_by_slug(db, slug)
        
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        return {
            **category.__dict__,
            "created_at": category.created_at.isoformat() if category.created_at else None,
            "updated_at": category.updated_at.isoformat() if category.updated_at else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching category by slug {slug}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error fetching category")


@router.post("", response_model=dict, status_code=201)
async def create_category(
    category_data: CategoryCreate,
    db: Session = Depends(get_db),
):
    """Create a new category (admin only)"""
    try:
        # Check if category with same slug already exists
        existing = CategoryService.get_category_by_slug(db, category_data.slug)
        if existing:
            raise HTTPException(
                status_code=409,
                detail="Category with this slug already exists"
            )
        
        category = CategoryService.create_category(db, category_data)
        
        return {
            **category.__dict__,
            "created_at": category.created_at.isoformat() if category.created_at else None,
            "updated_at": category.updated_at.isoformat() if category.updated_at else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating category: {str(e)}")
        raise HTTPException(status_code=500, detail="Error creating category")


@router.put("/{category_id}", response_model=dict)
async def update_category(
    category_id: int,
    category_data: CategoryUpdate,
    db: Session = Depends(get_db),
):
    """Update a category (admin only)"""
    try:
        category = CategoryService.update_category(db, category_id, category_data)
        
        if not category:
            raise HTTPException(status_code=404, detail="Category not found")
        
        return {
            **category.__dict__,
            "created_at": category.created_at.isoformat() if category.created_at else None,
            "updated_at": category.updated_at.isoformat() if category.updated_at else None,
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating category {category_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error updating category")


@router.delete("/{category_id}", status_code=204)
async def delete_category(
    category_id: int,
    db: Session = Depends(get_db),
):
    """Delete a category (admin only)"""
    try:
        success = CategoryService.delete_category(db, category_id)
        
        if not success:
            raise HTTPException(status_code=404, detail="Category not found")
        
        return None
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting category {category_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error deleting category")
