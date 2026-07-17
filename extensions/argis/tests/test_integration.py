"""Integration tests for Bifrost extensions."""

import pytest
import asyncio
from pathlib import Path
from typing import AsyncGenerator

# Test fixtures
@pytest.fixture
def test_data_dir() -> Path:
    """Get test data directory."""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_prompt() -> str:
    """Sample prompt for testing."""
    return "Write a Python function to sort a list of dictionaries by a specific key."


@pytest.fixture
def sample_response() -> str:
    """Sample response for testing."""
    return """
def sort_by_key(items, key):
    return sorted(items, key=lambda x: x.get(key))
"""


class TestDatasetLoading:
    """Test dataset loading functionality."""
    
    def test_dataset_config_creation(self):
        """Test creating dataset configuration."""
        from bifrost_extensions.services.promptadapter.datasets.manager import DatasetConfig
        
        config = DatasetConfig(
            use_wildchat=True,
            use_cursor=True,
            max_wildchat=100,
        )
        
        assert config.use_wildchat is True
        assert config.use_cursor is True
        assert config.max_wildchat == 100
    
    def test_data_source_enum(self):
        """Test DataSource enum values."""
        from bifrost_extensions.services.promptadapter.datasets.types import DataSource
        
        # Check new sources exist
        assert hasattr(DataSource, 'CURSOR_LOGS')
        assert hasattr(DataSource, 'TERMINAL_BENCH')
        assert hasattr(DataSource, 'MAGPIE')
        assert hasattr(DataSource, 'GITHUB_ISSUES')
        assert hasattr(DataSource, 'STACKOVERFLOW')
        assert hasattr(DataSource, 'ARXIV')
    
    def test_prompt_response_pair_creation(self):
        """Test creating prompt-response pairs."""
        from bifrost_extensions.services.promptadapter.datasets.types import (
            PromptResponsePair, DataSource, DataQuality
        )
        
        pair = PromptResponsePair(
            prompt="What is Python?",
            response="Python is a programming language.",
            source=DataSource.CURSOR_LOGS,
            quality=DataQuality.HIGH,
            model="cursor-default",
        )
        
        assert pair.prompt == "What is Python?"
        assert pair.source == DataSource.CURSOR_LOGS
        assert pair.quality == DataQuality.HIGH


class TestPromptAdapterPlugin:
    """Test prompt adapter plugin functionality."""
    
    def test_plugin_initialization(self):
        """Test plugin can be initialized."""
        # This would require the Go plugin to be built
        # For now, just verify the Python side is ready
        from bifrost_extensions.services.promptadapter.adapter import PromptAdapterPipeline
        
        pipeline = PromptAdapterPipeline()
        assert pipeline is not None


class TestResearchIntelPipeline:
    """Test research intelligence pipeline."""
    
    def test_proposal_types(self):
        """Test proposal type definitions."""
        from bifrost_extensions.services.researchintel.types import (
            ProposalType, ProposalStatus, ModelLocation
        )
        
        assert ProposalType.TOOL.value == "tool"
        assert ProposalType.MODEL.value == "model"
        assert ProposalType.SUBSCRIPTION.value == "subscription"
        
        assert ProposalStatus.DRAFT.value == "draft"
        assert ProposalStatus.APPROVED.value == "approved"
        
        assert ModelLocation.LOCAL.value == "local"
        assert ModelLocation.REMOTE.value == "remote"


class TestDatasetWeighting:
    """Test dataset weighting strategy."""
    
    def test_quality_weights(self):
        """Test data quality weights."""
        from bifrost_extensions.services.promptadapter.datasets.types import DataQuality
        
        # Verify weighting values
        assert DataQuality.HIGH.value == 3
        assert DataQuality.MEDIUM.value == 2
        assert DataQuality.LOW.value == 1


if __name__ == "__main__":
    pytest.main([__file__, "-v"])

